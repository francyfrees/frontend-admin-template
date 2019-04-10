<template>
  <div class="login-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      auto-complete="on"
      status-icon
      class="login-form"
      center
    >
      <h1 class="title">
        {{ $t('auth.signIn.title') }}
      </h1>
      <el-form-item prop="account">
        <div class="item-content">
          <span class="iconfont icon-sign-user" />
          <el-input
            v-model="form.account"
            :placeholder="$t('auth.signIn.account')"
            type="tel"
            auto-complete="off"
          />
        </div>
      </el-form-item>
      <el-form-item
        prop="password"
      >
        <div class="item-content">
          <span class="iconfont icon-sign-pwd" />
          <el-input
            v-model="form.password"
            :maxlength="15"
            :placeholder="$t('auth.signIn.password')"
            :type="pType"
            auto-complete="new-password"
            @keyup.enter.native="formSubmit"
          />
          <i
            :class="showIcon"
            class="show-pwd iconfont"
            @click="showPwd"
          />
        </div>
      </el-form-item>
      <el-form-item style="margin-bottom: 0;">
        <el-button
          :loading="listLoading"
          type="primary"
          @click.native.prevent="formSubmit"
        >
          {{ $t('auth.signIn.signIn') }}
        </el-button>
      </el-form-item>
      <el-form-item style="margin-bottom: 0; margin-top: 10px;">
        <slot name="registerUse" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { signIn, fetchHash } from '@/api/auth'

import { passwordEncrypt } from '@/utils/encrypt'

import rules from '@/validate/auth/signIn'

import { errMsg } from '@/utils'

import configCode from '@/config/configCode'
const { HTTP_RESPONSE_STATUS_SUCCESS } = configCode

import configPrompt from '@/config/configPrompt'
const { SU_SIGN_IN } = configPrompt

import { ISignIn } from '@/interface/api/auth'

@Component
export default class SignIn extends Vue {
    private listLoading: boolean = false
    private pType: string = 'password'
    private showIcon: string = 'icon-hide-pwd'
    private form: { [propName: string]: any } = {
      account: '',
      password: '',
      hash: ''
    }
    private rules: { [propName: string]: any } = rules
    private created() {
    // this.getHash()
    }
    private loading(boolean: boolean): void {
      this.listLoading = boolean
    }
    private refs(ref: string, unitCb?: () => void): any {
      unitCb && unitCb()
      return this.$refs[ref]
    }
    private showPwd(): void {
      if (this.pType === 'password') {
        this.pType = 'text'
        this.showIcon = 'icon-show-pwd'
      } else {
        this.pType = 'password'
        this.showIcon = 'icon-hide-pwd'
      }
    }
    private getHash(): void {
      fetchHash().then((response: Ajax.AxiosResponse) => {
        const status = parseInt(response.data.status as string, 10)
        if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
          this.form.hash = response.data.data.hash
        }
      })
    }
    private formSubmit(): void {
      this.refs('form').validate(this.validateCb)
    }
    private validateCb(vaild: boolean) {
      if (vaild) {
        const data: ISignIn = {
          account: this.form.account,
          password: passwordEncrypt(this.form.hash, this.form.password),
          hash: this.form.hash
        }
        this.handleSignIn(data)
      }
    }
    private async handleSignIn(data: ISignIn) {
      this.loading(true)
      try {
        await signIn(data).then(this.apiSignInCb)
        this.loading(false)
      } catch (error) {
        console.log('err: ' + error)
        this.loading(false)
      }
    }
    private apiSignInCb(response: Ajax.AxiosResponse) {
      const status = parseInt(response.data.status as string, 10)
      if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
        this.$message({
          message: SU_SIGN_IN,
          type: 'success'
        })
        this.$router.push({ path: '/' })
      } else {
        errMsg(response)
      }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "../../styles/mixin";
$bg: #2d3a4b;
$light_gray: #eee;
.login-container {
  .el-input {
    display: inline-block;
    width: 85%;
    .el-input__inner {
      background-color: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 10px;
      color: $light_gray;
    }
  }
  .el-button {
    width: 90%;
    height: 37px;
    border-color: rgba(6, 202, 158, 0.6);
    background-color: rgba(6, 202, 158, 0.2);
    border: none;
    color: #fff;
    &:hover {
      background-color: rgba(6, 202, 158, 0.6);
    }
    &:visited {
      border: none;
    }
    @include transition(all, 0.3s, ease);
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/mixin";
.login-container {
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  padding: 35px 25px 25px;
  max-width: 400px;
  background-color: rgba(16, 32, 66, 0.4);
  border-radius: 6px;
  $an1: (
    transform: translateY(-20%),
    opacity: 0
  );
  $an2: (
    transform: translateY(0),
    opacity: 1
  );
  $demo: (
    0%: $an1,
    100%: $an2
  );
  @include keyframes(guideac, $demo);
  @include animation(guideac 0.8s linear);
  .login-form {
    text-align: center;
    .title {
      margin-bottom: 1.2em;
      color: #fff;
      font-size: 1.4em;
    }
    .item-content {
      position: relative;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 5px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.1);
      text-align: left;
      .show-pwd {
        position: absolute;
        right: 0;
        top: 0;
        width: 43px;
        height: 43px;
        line-height: 43px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 414px) {
  .login-container {
    padding-top: 0;
    max-width: 85%;
    background-color: transparent;
  }
}
</style>


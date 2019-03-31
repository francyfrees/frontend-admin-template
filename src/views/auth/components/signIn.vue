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
        style="margin-bottom: 0"
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
      <el-form-item style="margin-bottom: 0; text-align: right">
        <slot name="findPassword" />
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

import { signIn, getHash } from '@/api/auth'

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
      getHash().then((response: Ajax.AxiosResponse) => {
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

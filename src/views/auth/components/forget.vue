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
      <slot name="forget" />
      <h1 class="title">
        {{ $t('auth.forget.title') }}
      </h1>

      <el-form-item prop="phone">
        <div class="item-content">
          <span class="__label-tit"> {{ $t('auth.forget.phone') }} </span>
          <el-input
            ref="phone"
            v-model="form.phone"
            :maxlength="11"
            :placeholder="$t('auth.forget.phoneMsg')"
            type="tel"
            auto-complete="off"
          />
        </div>
      </el-form-item>

      <el-form-item prop="code">
        <div class="item-content">
          <span class="__label-tit"> {{ $t('auth.forget.code') }} </span>
          <el-input
            ref="code"
            v-model="form.code"
            :maxlength="6"
            :placeholder="$t('auth.forget.codeMsg')"
            style="width: 150px"
          />
          <verification-code
            :mobile="form.phone"
            :time="160"
            @sendSuccess="codeSendSuccess"
            @sendError="codeSendError"
          />
        </div>
      </el-form-item>

      <el-form-item prop="password">
        <div class="item-content">
          <span class="__label-tit"> {{ $t('auth.forget.newPassword') }} </span>
          <el-input
            v-model="form.password"
            :minlength="6"
            :maxlength="20"
            :placeholder="$t('auth.forget.newPasswordMsg')"
            :type="pType"
            auto-complete="new-password"
          />
          <i
            :class="showIcon"
            class="show-pwd iconfont"
            @click="showPwd"
          />
        </div>
      </el-form-item>

      <el-form-item prop="rePassword">
        <div class="item-content">
          <span class="__label-tit">
            {{ $t('auth.forget.confirmPassword') }}
          </span>
          <el-input
            v-model="form.rePassword"
            :minlength="6"
            :maxlength="20"
            :placeholder="$t('auth.forget.confirmPasswordMsg')"
            :type="pRePasswordType"
            auto-complete="new-password"
            @keyup.enter.native="handleResetPassword"
          />
          <i
            :class="showReIcon"
            class="show-pwd iconfont"
            @click="showRePwd"
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
          @click.native.prevent="handleResetPassword"
        >
          {{ $t('auth.forget.resetPassword') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import VerificationCode from '@/components/VerificationCode/index.vue'

import { resetPassword, getHash } from '@/api/auth'

import { passwordEncrypt } from '@/utils/encrypt'

import { deepClone } from '@/utils'

import rules from '@/validate/auth/forget'

import configCode from '@/config/configCode'
const { HTTP_RESPONSE_STATUS_SUCCESS } = configCode

import configPrompt from '@/config/configPrompt'
const { SU_RESET_PASSWORD, ER_PASSWORD_DIFF } = configPrompt

import { ISignIn } from '@/interface/api/auth'

@Component({
  components: {
    VerificationCode
  }
})
export default class Forget extends Vue {
  private listLoading!: boolean
  private pType!: string
  private pRePasswordType!: string
  private showIcon!: string
  private showReIcon!: string
  private form: { [propName: string]: any } = {
    phone: '',
    code: '',
    password: '',
    rePassword: '',
    hash: ''
  }
  private data() {
    return {
      listLoading: false,
      pType: 'password',
      pRePasswordType: 'password',
      showIcon: 'icon-hide-pwd',
      showReIcon: 'icon-hide-pwd'
    }
  }
  private rules: { [propName: string]: any } = rules
  private created() {
    // this.getHash()
  }
  private refs(ref: string, unitCb?: () => void): any {
    unitCb && unitCb()
    return this.$refs[ref]
  }
  private loading(boolean: boolean): void {
    this.listLoading = boolean
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
  private showRePwd(): void {
    if (this.pRePasswordType === 'password') {
      this.pRePasswordType = 'text'
      this.showReIcon = 'icon-show-pwd'
    } else {
      this.pRePasswordType = 'password'
      this.showReIcon = 'icon-hide-pwd'
    }
  }
  private getHash(): void {
    getHash().then((response: Ajax.AxiosResponse) => {
      const status = parseInt((response.data.status) as string, 10)
      if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
        this.form.hash = response.data.data.hash
      }
    })
  }
  private codeSendSuccess(msg: string): void {
    this.$message({
      message: msg,
      type: 'success'
    })
    this.refs('code').focus()
  }
  private codeSendError(msg: string): void {
    this.$message({
      message: msg,
      type: 'error'
    })
    this.refs('phone').focus()
  }
  private resetFrom() {
    this.form = {
      phone: '',
      code: '',
      password: '',
      rePassword: '',
      hash: ''
    }
    this.$nextTick(() => {
      this.refs('form').clearValidate()
    })
  }
  private handleResetPassword(): void {
    this.refs('form').validate(this.validateCb)
  }
  private validateCb(vaild: boolean, unitCb?: () => void): void {
    if (vaild) {
      if (this.form.password !== this.form.rePassword) {
        this.$message({
          message: ER_PASSWORD_DIFF,
          type: 'error'
        })
        return
      }
      this.loading(true)
      const post = deepClone(this.form)
      post.password = passwordEncrypt(post.hash, post.password)
      delete post.rePassword
      this.registerFn(post)
      return
    }
    typeof unitCb === 'function' && unitCb()
  }
  private registerFn(post: any): void {
    resetPassword(post)
      .then((response: any) => {
        const status = parseInt((response.data.status) as string, 10)
        if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
          this.$message({
            message: SU_RESET_PASSWORD,
            type: 'success'
          })
          this.resetFrom()
          this.$emit('registerSuccess')
        } else {
          this.$message({
            message: response.data.data.detail,
            type: 'error'
          })
        }
      })
      .finally(() => {
        this.loading(false)
      })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.login-form {
  position: relative;
  user-select: none;
}
.__label-tit {
  width: 60px;
  display: inline-block;
}
</style>

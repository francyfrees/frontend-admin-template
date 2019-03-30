<template>
  <div
    :class="`code ${sendSuccess ? '__code-disable' : ''}`"
    :disabled="sendSuccess"
    @click="sendClick()"
  >
    <i
      v-show="iconLoading"
      class="el-icon-loading"
    />
    {{ sendSuccess ? count + 's后可重新发送' : '发送验证码' }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { sendCode } from '@/api/auth'

import configCode from '@/config/configCode'
const { HTTP_RESPONSE_STATUS_SUCCESS } = configCode

import configPattern from '@/config/configPattern'
const { _regexp_cell_phone } = configPattern

@Component
export default class VerificationCode extends Vue {
  @Prop({ type: String, default: '' }) mobile!: string
  @Prop({ type: Number, default: 150 }) time!: number
  private sendSuccess!: boolean
  private count!: number
  private lock!: boolean
  private timer!: any
  private iconLoading!: boolean
  private data() {
    return {
      sendSuccess: false,
      count: this.time,
      lock: true,
      timer: null,
      iconLoading: false
    }
  }
  private finish() {
    this.sendSuccess = true
    let Time = setInterval(() => {
      if (this.count <= 1) {
        clearInterval(Time)
        this.sendSuccess = false
        this.count = this.time
      } else {
        this.count--
      }
    }, 1000)
  }
  private handleLock(state: boolean): void {
    this.lock = state
  }
  private timerLock(time: number): void {
    this.timer = setTimeout(() => {
      this.handleLock(true)
    }, time)
  }
  private sendClick(unitCb?: () => void) {
    clearTimeout(this.timer)
    if (this.sendSuccess) {
      unitCb && unitCb()
      return
    }
    if (!this.lock) {
      this.timerLock(2e3)
      return
    }
    if (!_regexp_cell_phone.test(this.mobile)) {
      this.handleLock(false)
      this.timerLock(2e3)
      this.$emit('sendError', '请填写正确手机号')
      return
    }
    this.sendCodeFn()
  }
  private async sendCodeFn() {
    this.iconLoading = true
    try {
      const data = {
        mobile: this.mobile,
        r: Math.random()
      }
      const res = await sendCode(data)
      this.sendCodeApiCb(res)
    } catch (error) {
      this.$emit('sendError', '系统繁忙，发送失败')
    }
    this.iconLoading = false
  }
  private sendCodeApiCb(response: any) {
    const status = parseInt((response.data.status) as string, 10)
    if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
      try {
        this.finish()
        this.$emit('sendSuccess', response.data.data.detail)
      } catch (err) {
        console.log('data err')
      }
    } else {
      this.$emit('sendError', '发送失败，请重新发送')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.code {
  position: absolute;
  right: 5px;
  top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #e54;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
  &:hover {
    background-color: rgb(238, 72, 53);
  }
  &.__code-disable {
    background-color: rgb(170, 169, 169);
  }
}
</style>

<template>
  <div>
    <signIn v-show="isSignInPage">
      <template v-slot:findPassword>
        <div
          class="__find-password"
          @click="switchForgetPage"
        >
          {{ $t('auth.findPassword') }}
        </div>
      </template>
      <template v-slot:registerUse>
        <div
          class="__register-use"
          @click="switchRegisterPage"
        >
          {{ $t('auth.registerUse') }}
        </div>
      </template>
    </signIn>

    <register
      v-show="isRegisterPage"
      @registerSuccess="switchSignInPage"
    >
      <template v-slot:register>
        <span
          class="__back-lognin"
          @click="switchSignInPage"
        >
          {{ $t('auth.logIn') }}
        </span>
      </template>
    </register>

    <forget
      v-show="isForgetPage"
      @resetSuccess="switchSignInPage"
    >
      <template v-slot:forget>
        <span
          class="__back-lognin"
          @click="switchSignInPage"
        >
          {{ $t('auth.goLognIn') }}
        </span>
      </template>
    </forget>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import signIn from './components/signIn.vue'
import register from './components/register.vue'
import forget from './components/forget.vue'

@Component({
  components: {
    signIn,
    register,
    forget
  }
})
export default class Auth extends Vue {
    private page!: string
    private data() {
      return {
        page: 'signInPage'
      }
    }
    get isSignInPage() {
      return this.page === 'signInPage'
    }
    get isRegisterPage() {
      return this.page === 'registerPage'
    }
    get isForgetPage() {
      return this.page === 'forgetPage'
    }
    private switchSignInPage() {
      this.page = 'signInPage'
    }
    private switchForgetPage() {
      this.page = 'forgetPage'
    }
    private switchRegisterPage() {
      this.page = 'registerPage'
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import '../../styles/mixin';
$bg: #2d3a4b;
$light_gray: #eee;
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
  .el-input {
    display: inline-block;
    width: 76%;
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
  .__find-password {
    display: inline-block;
    color: #fff;
    cursor: pointer;
  }
  .__register-use {
    display: inline-block;
    color: #fff;
    cursor: pointer;
    text-decoration: underline;
  }
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
        top: 5px;
        width: 37px;
        height: 37px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
.__back-lognin {
  position: absolute;
  right: 0;
  top: -35px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
}
@media (max-width: 414px) {
  .login-container {
    padding-top: 0;
    max-width: 90%;
    background-color: transparent;
  }
}
</style>

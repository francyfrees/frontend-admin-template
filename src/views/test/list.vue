<template>
  <div>
    测试页面一---列表
    <h1>Hello Ts</h1>
    <router-link to="/">
      Hello Vue
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Route from 'vue-router'

@Component
export default class Test1List extends Vue {
  beforeRouteEnter(to: Route, from: Route, next: Function) {
    // console.log('beforeRouteEnter')
    next()
  }
  beforeRouteLeave(to: Route, from: Route, next: Function) {
    // console.log('Hello: beforeRouteLeave')
    next()
  }
}
</script>

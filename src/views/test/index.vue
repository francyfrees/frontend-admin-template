<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <router-view :key="key" />
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Test extends Vue {
  get key() {
    return this.$route.fullPath + Number(new Date())
  }
}
</script>

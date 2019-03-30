<template>
  <div
    v-loading.fullscreen.lock="isLoading"
    :element-loading-text="$t('loading.loadingText')"
    element-loading-background="rgba(0, 0, 0, 0)"
    class="page-loading"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { Getter, Action, State, namespace } from 'vuex-class'
// 命名空间
const counterModule = namespace('app')

@Component
export default class PageLoading extends Vue {
  @counterModule.State('isLoading') public isLoading: any
}
</script>

<style lang="postcss">
.page-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  width: 200px;
  transform: translate3d(-50%, -50%, 0);
}
</style>

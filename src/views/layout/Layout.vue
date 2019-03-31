<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <header-bar />
    <page-loading />
    <div
      class="main-container"
      :style="`margin-left: ${generateWidth}px`"
    >
      <template>
        <tags-view :style="`left: ${generateWidth}px`" />
        <sidebar
          class="sidebar-container"
          :style="
            `width: ${generateWidth}px !important`
          "
        />
      </template>
      <template v-if="name !== 'dashboard'">
        <breadcrumb class="breadcrumb-container" />
        <app-main />
      </template>
      <template v-else>
        <app-main style="margin-top: 13px;" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { HeaderBar, Sidebar, AppMain, TagsView } from './components'
import PageLoading from '@/components/PageLoading/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import ResizeMixin from './mixin/ResizeHandler'

import configCode from '@/config/configCode'
const { closeNavWidth } = configCode

import { namespace } from 'vuex-class'
const counterModule = namespace('app')

@Component({
  components: {
    HeaderBar,
    Breadcrumb,
    Sidebar,
    TagsView,
    AppMain,
    PageLoading
  },
  mixins: [ResizeMixin]
})
export default class Layout extends Vue {
  @counterModule.State('sidebar') public sidebar!: any
  @counterModule.State('device') public device!: string
  @counterModule.State('navWidth') public navWidth!: number
  @counterModule.State('varyWidth') public width!: number
  @counterModule.Action public closeSideBar!: (data: {
      withoutAnimation: boolean;
  }) => void
  get varyWidth() {
    return this.width
  }
  get classObj(): object {
    return {
      hideSidebar: !this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === 'mobile'
    }
  }
  get name(): string | undefined {
    return this.$route.name
  }
  get generateWidth() {
    return this.sidebar.opened ? this.navWidth + this.varyWidth : closeNavWidth
  }
  handleClickOutside(): void {
    this.closeSideBar({ withoutAnimation: false })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  min-height: 100%;
  width: 100%;
}

.breadcrumb-container {
  padding-left: 12px;
  height: 48px;
  line-height: 48px;
}
</style>

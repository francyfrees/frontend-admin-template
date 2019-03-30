<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :collapse="isCollapse"
      mode="vertical"
      @open="handleOpen"
      @close="handleClose"
    >
      <sidebar-item :routes="permissionRouters" />
    </el-menu>
    <div
      class="copy"
      :style="cobyStyle"
    >
      <a
        href="https://www.qixinyun.com/index.html"
        target="_blank"
      >
        {{ $t('route.support') }}
      </a>
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem.vue'

import { generateTitle } from '@/utils/i18n'

import configCode from '@/config/configCode'
const { closeNavWidth, navWordCount, navWordWidth } = configCode

import { Component, Vue } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
const counterModuleApp = namespace('app')
const counterModulePermission = namespace('permission')

@Component({
  components: {
    SidebarItem
  }
})
export default class HeaderBar extends Vue {
  @counterModulePermission.State('routers') public permissionRouters?: any
  @counterModuleApp.State('sidebar') public sidebar?: any
  @counterModuleApp.State('device') public device?: any
  @counterModuleApp.State('navWidth') public navWidth!: number
  @counterModuleApp.Action public setNavWidth!: (navWidth: number) => void
  @counterModuleApp.Action public setVaryWidth!: (varyWidth: number) => void
  private generateTitle: (title: string) => string = generateTitle
  private varyWidth!: number
  private cacheCount!: any
  private data() {
    return {
      varyWidth: 0,
      cacheCount: {}
    }
  }
  get cobyStyle(): object {
    return {
      width: this.computedStyle() + 'px'
    }
  }
  get isCollapse() {
    return !this.sidebar.opened
  }
  private created() {
    this.genarateSideBar()
  }
  private genarateSideBar() {
    const wordCount: number[] = []
    this.permissionRouters.forEach((item: any, index: number, array: any[]) => {
      if (!item.hidden && item.meta && item.meta.title) {
        const zhName = this.generateTitle(item.meta.title)
        if (zhName && zhName.length > 5) {
          wordCount.push(zhName.length)
        }
      }
    })
    if (wordCount.length) {
      const len = Math.max(...wordCount)
      const width = Math.ceil(len - 5) * navWordWidth
      this.setNavWidth(width)
    }
  }
  private computedStyle() {
    if (this.device === 'desktop' && this.sidebar.opened) {
      return this.navWidth + this.varyWidth
    }
    if (this.device === 'mobile') {
      return this.navWidth
    }
    return closeNavWidth
  }
  private findRouteName(router: any[], key: string, keyPath: string[]) {
    return router.some(
      (item: any, index: number, array: any[]): boolean => {
        // 查找对应点击的路由 && // 查找对应路由里侧导航显示的子路由，并且子路由中的字数超出显示范围
        if (
          (item.name === key || item.path === key) &&
          this.findRouteNameOverfloow(item)
        ) {
          return true
        } else {
          if (item.children && item.children.length > 0) {
            return this.findRouteName(item.children, key, keyPath)
          }
          return false
        }
      }
    )
  }
  private findRouteNameOverfloow(item: any) {
    if (item.children && item.children.length > 0) {
      const wordCount: number[] = []
      item.children.forEach(
        (itemChild: any, index: number, array: any[]): void => {
          // 计算出每个子路由的字数长度，对比是否大于标准长度，若是，则存到数组中
          if (!itemChild.hidden && itemChild.meta && itemChild.meta.title) {
            const zhName = this.generateTitle(itemChild.meta.title)
            if (zhName && zhName.length > navWordCount) {
              wordCount.push(zhName.length)
            }
          }
        }
      )
      // 找出数组最长的一个，计算出对应宽度
      if (wordCount.length) {
        const len = Math.max(...wordCount)
        const width = Math.ceil(len - navWordCount) * navWordWidth
        // 缓存对应路由菜单动态宽度
        this.cacheCount[item.name || item.path] = width
        return true
      }
      return false
    }
    return false
  }
  private recalculate(): number {
    const cacheArr: number[] = Object.values(this.cacheCount)
    if (cacheArr.length) {
      return Math.max(...cacheArr)
    }
    return 0
  }
  private handleOpen(key: string, keyPath: string[]) {
    const result = this.findRouteName(this.permissionRouters, key, keyPath)
    if (this.device === 'desktop' && result) {
      const res = this.recalculate()
      this.setVaryWidth(res)
      this.varyWidth = res
    }
  }
  // 1.子菜单里多个路由时，字数只取第一个路由（应该取最大路由字数）
  // 2.点击导航按钮，路由菜单收回，但是宽度还是展开状态（只要路由菜单关闭，就将宽度收回标准宽度）
  // 3.多个路由菜单打开后，关闭一个之后，其他打开的路由菜单全部恢复标准宽度

  // 点击关闭路由菜单，重新计算当前展开路由菜单中最大的子路由长度，让导航宽度重新响应
  private handleClose(key: string, keyPath: string[]) {
    if (this.device === 'desktop') {
      delete this.cacheCount[key]
      const res = this.recalculate()
      this.setVaryWidth(res)
      this.varyWidth = res
    }
  }
}
</script>

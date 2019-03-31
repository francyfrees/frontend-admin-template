<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator-class="el-icon-arrow-right"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="item.path"
      >
        <span
          v-if="
            item.redirect === 'noredirect' || index === levelList.length - 1
          "
          class="no-redirect"
        >
          {{ generateTitle(item.meta.title) }}
        </span>
        <router-link
          v-else
          :to="item.redirect || item.path"
        >
          {{ generateTitle(item.meta.title) }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'

import { generateTitle } from '@/utils/i18n'

@Component
export default class Breadcrumb extends Vue {
  private levelList!: any[]
  private resMatched!: any[]
  private generateTitle: (title: string) => string = generateTitle
  private data() {
    return {
      levelList: [],
      resMatched: []
    }
  }
  @Watch('$route')
  private OnRouteChange(unitCb?: () => void) {
    this.getBreadcrumb()
    typeof unitCb === 'function' && unitCb()
  }
  private created() {
    this.getBreadcrumb()
  }
  private getBreadcrumb(): void {
    const route = this.$route.matched
    const matched: any[] = route.filter(item => item.name)
    const res = this.hasDashboard(matched[0], matched)
    this.levelList = res
  }
  private hasDashboard(first: any, matched: any[]) {
    this.resMatched = matched
    if (first && first.name !== 'dashboard') {
      const arr = [
        {
          path: '/dashboard',
          meta: { title: 'dashboard' }
        }
      ].concat(matched)
      this.resMatched = arr
    }
    return this.resMatched
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>

<template>
  <el-dropdown
    class="theme-setting "
    trigger="click"
    @command="handleSetTheme"
  >
    <span class="el-dropdown-link">
      <i class="iconfont icon-setting" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <!-- <el-dropdown-item command="light" :disabled="theme === 'light'">{{$t('headerBar.light')}}</el-dropdown-item> -->
      <el-dropdown-item
        :disabled="theme === 'rose'"
        command="rose"
      >
        {{ $t('headerBar.rose') }}
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="theme === 'jack'"
        command="jack"
      >
        {{ $t('headerBar.jack') }}
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="theme === 'bee'"
        command="bee"
      >
        {{ $t('headerBar.bee') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
const appModule = namespace('app')

import configPrompt from '@/config/configPrompt'
const { SUCCESS_THEME_HAS_BEEN_CHANGED } = configPrompt

@Component
export default class ThemeSelect extends Vue {
  @appModule.State('theme') public theme!: string
  @appModule.Action('setTheme') public setTheme: any
  private handleSetTheme(themeItem: any) {
    const app = document.getElementById('app')
    this.setTheme(themeItem)
    this.$message({
      message: SUCCESS_THEME_HAS_BEEN_CHANGED,
      type: 'success'
    })
    this.changeTheme(app, themeItem)
  }
  private changeTheme(element: any, className: string) {
    element.className = className
  }
}
</script>

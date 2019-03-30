<template>
  <el-header
    class="header-bar"
    height="58px"
  >
    <!-- logo -->
    <router-link
      :title="$t('headerBar.logo')"
      to="/"
      class="logo"
    >
      {{ $t('headerBar.logo') }}
    </router-link>
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <div
      v-show="device !== 'mobile'"
      class="header-marquee"
    >
      <vue-seamless-scroll
        :data="marqueeData"
        :class-option="classOption"
        class="seamless-warp"
      >
        <ul class="item">
          <li
            v-for="(item, index) in marqueeData"
            :key="index"
          >
            <!-- <router-link
              :to="'/system/systemMessages/detail/' + item.id"
              :key="index"
              class="scroll-content"
            >{{ item.title }}</router-link> -->
            <a href="javascript: void(0);"> {{ item.title }} </a>
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
    <div class="right-menu">
      <!-- 用户信息 -->
      <el-dropdown
        class="avatar-container right-menu-item"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <el-badge
            v-if="total"
            :value="total"
            class="mark"
          />
          <img
            :src="domain + (adminAvatar ? adminAvatar : defaultAvatar)"
            class="user-avatar"
          >
          <span class="login-user-info">
            {{ adminName }}
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">
              {{ $t('headerBar.dashboard') }}
            </router-link>
          </el-dropdown-item>
          <!-- <el-dropdown-item>
            <router-link to="/personalCenter/basicInfo/index">
              {{ $t('headerBar.personalCenter') }}
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/todoList">
              {{ $t('headerBar.todoList') }}
              <el-badge v-if="total" :value="total" />
            </router-link>
          </el-dropdown-item> -->
          <el-dropdown-item>
            <a
              href="javascript:;"
              style="display:block;"
              @click="signOut"
            >
              {{ $t('headerBar.signOut') }}
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 主题设置 -->
      <theme-select class="right-menu-item" />

      <!-- 更新缓存 -->
      <el-tooltip
        v-if="device !== 'mobile'"
        :content="$t('headerBar.refresh')"
        class="right-menu-item"
        effect="dark"
        placement="bottom"
      >
        <refresh class="refresh right-menu-item" />
      </el-tooltip>

      <!-- 全屏模式 -->
      <el-tooltip
        v-if="device !== 'mobile'"
        :content="$t('headerBar.screenfull')"
        class="right-menu-item"
        effect="dark"
        placement="bottom"
      >
        <Screenfull class="screenfull right-menu-item" />
      </el-tooltip>
    </div>
  </el-header>
</template>

<script lang="ts">
import Hamburger from '@/components/Hamburger/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import Refresh from '@/components/Refresh/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'
import vueSeamlessScroll from 'vue-seamless-scroll'

import configCode from '@/config/configCode'
const { defaultAvatar, DOMAIN } = configCode

import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
// 命名空间
const counterAppModule = namespace('app')
const counterUserModule = namespace('user')

@Component({
  components: {
    Hamburger,
    Screenfull,
    Refresh,
    ThemeSelect,
    vueSeamlessScroll
  }
})
export default class HeaderBar extends Vue {
  @counterAppModule.State('device') public deviceType?: string
  @counterAppModule.State('sidebar') public sidebar?: object
  @counterUserModule.State('adminName') public adminName?: string
  @counterUserModule.State('adminAvatar') public adminAvatar?: string
  @counterUserModule.Action public SignOut!: () => Promise<any>
  private defaultAvatar: string = defaultAvatar
  private domain: string = DOMAIN
  private total!: number
  private marqueeData: any[] = [
    {
      id: 'MA',
      title: '欢迎登陆后台管理系统'
    },
    {
      id: 'MA',
      title: '您有10条待办事项待处理'
    }
  ]
  private data() {
    return {
      total: 0
    }
  }
  get device(): any {
    return this.deviceType
  }
  get classOption(): any {
    return {
      direction: 2,
      limitMoveNum: 2
    }
  }
  signOut() {
    this.SignOut().then(() => {
      // this.$router.push({ path: '/signIn' })
      location.reload()
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.seamless-warp {
  overflow: hidden;
  height: 58px;
  width: 100%;
  ul.item {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    width: calc(100vw - 506px);
    height: 58px;
    li {
      float: left;
      margin-right: 30px;
      height: 58px;
      line-height: 58px;
      font-size: 16px;
    }
  }
}
</style>

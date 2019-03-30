<template>
  <div class="hamburger-drag">
    <div
      :class="{ 'is-active': isActive }"
      class="hamburger"
    >
      <i
        class="iconfont icon-hamburger"
        @click="toggleSideBar"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, namespace } from 'vuex-class'
// 命名空间
const counterModule = namespace('app')

@Component
export default class Hamburger extends Vue {
  @Prop({ type: Boolean, default: false }) isActive!: boolean
  @counterModule.Action public toggleSideBar!: (data: any) => void
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.hamburger-drag {
  display: inline-block;
  text-align: center;

  .hamburger {
    cursor: pointer;
    width: 100%;
    height: 100%;
    transform: rotate(90deg);
    transition: all 0.3s linear;

    .iconfont {
      font-size: 16px;
    }

    &.is-active {
      transform: rotate(0);
    }
  }
}
</style>

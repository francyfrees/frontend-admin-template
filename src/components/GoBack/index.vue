<template>
  <div class="tabs-side-menu">
    <i
      :title="$t('form.close')"
      class="el-icon-close icon-close"
      @click="goBack"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class GoBack extends Vue {
  goBack(unitCb?: () => void) {
    unitCb && unitCb()
    return window.history.length > 1
      ? this.$router.go(-1)
      : this.$router.push('/')
  }
}
</script>
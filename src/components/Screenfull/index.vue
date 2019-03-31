<template>
  <div>
    <i
      class="iconfont icon-screenfull"
      @click="click"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import screenfull from 'screenfull'

@Component
export default class Screenfull extends Vue {
    private screenf!: any
    private data() {
      return {
        screenf: screenfull
      }
    }
    private click(): boolean | undefined {
      if (!this.screenf.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return
      }
      this.screenf.toggle()
    }
}
</script>

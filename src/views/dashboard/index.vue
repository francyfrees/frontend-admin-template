<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import adminDashboard from './admin/index.vue'
@Component({
  components: {
    adminDashboard
  }
})
export default class dashboard extends Vue {
  currentRole: string = 'adminDashboard'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  position: relative;
  .filter-bar {
    position: absolute;
    top: -40px;
    right: 0;
    margin-bottom: 0;
  }
}
</style>

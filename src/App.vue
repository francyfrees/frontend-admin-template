<template>
  <div
    id="app"
    :class="theme"
  >
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
const appModule = namespace('app')

@Component
export default class App extends Vue {
  @appModule.State('theme') theme!: string
}
</script>

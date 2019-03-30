<template>
  <div class="search-component filter-item">
    <el-input
      v-model="searchVal"
      :placeholder="placeholder"
      class="input-with-select"
      @keyup.enter.native="search"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="search"
      />
    </el-input>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SearchForm extends Vue {
  @Prop({ type: String, default: '请输入内容' }) placeholder!: string
  private searchVal!: string
  private data() {
    return {
      searchVal: ''
    }
  }
  search(unitCb?: () => void) {
    this.$emit('handleSearch', this.searchVal)
    unitCb && unitCb()
  }
}
</script>

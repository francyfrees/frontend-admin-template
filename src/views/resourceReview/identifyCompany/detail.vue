<template>
  <div class="container-fluid">
    <go-back />
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane :label="$t('hostel.label.detail')">
        <div
          v-loading="listLoading"
          :element-loading-text="$t('loading.loadingText')"
          class="show-content"
        >
          <div class="right">
            <el-row :gutter="12">
              <el-col :span="24">
                <el-button
                  type="success"
                  size="small"
                  icon="el-icon-edit"
                  plain
                  @click="router"
                >
                  {{ $t('operation.edit') }}
                </el-button>
              </el-col>
            </el-row>
          </div>
          <dl class="dl-horizontal">
            <!-- 民宿名称 -->
            <dt>{{ $t('hostel.name') }}</dt>
            <dd>{{ info.name }}</dd>

            <!-- logo -->
            <dt>{{ $t('hostel.logo') }}</dt>
            <dd>
              <img
                v-if="info.logo"
                :src="domain + info.logo"
                alt=""
                class="img-size-100"
              >
            </dd>

            <!-- 联系方式 -->
            <dt>{{ $t('hostel.phone') }}</dt>
            <dd>{{ info.phone }}</dd>

            <!-- 客房总数 -->
            <dt>{{ $t('hostel.roomTotal') }}</dt>
            <dd>{{ info.roomTotal }}</dd>

            <!-- 地址 -->
            <dt>{{ $t('hostel.region') }}</dt>
            <dd>
              <span v-if="info.region">{{ info.region }}</span>
            </dd>

            <!-- 详细地址 -->
            <dt>{{ $t('hostel.address') }}</dt>
            <dd>{{ info.address }}</dd>

            <!-- 简介 -->
            <dt>{{ $t('hostel.note') }}</dt>
            <dd>{{ info.note }}</dd>

            <!-- 民宿图片 -->
            <dt>{{ $t('hostel.images') }}</dt>
            <dd>
              <template v-if="Array.isArray(info.images) && info.images.length">
                <img
                  v-for="(item, index) in info.images"
                  :key="index"
                  :src="domain + item"
                  style="margin-right: 10px"
                  class="img-size-100"
                  alt=""
                >
              </template>
            </dd>

            <!-- 创建时间 -->
            <dt>{{ $t('hostel.createTime') }}</dt>
            <dd>{{ info.createTime | formatTime }}</dd>

            <!-- 更新时间 -->
            <dt>{{ $t('hostel.updateTime') }}</dt>
            <dd>{{ info.updateTime | formatTime }}</dd>
          </dl>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import goBack from '@/components/GoBack/index.vue'

import { fetchHostelDetail } from '@/api/hostel'

import configCode from '@/config/configCode'
const {
  HTTP_RESPONSE_STATUS_SUCCESS,
  CONFIRM_CONTENT,
  CONFIRM_TITLE,
  DOMAIN
} = configCode

@Component({
  components: {
    goBack
  }
})
export default class IdentifyCompanyDetail extends Vue {
  private domain: string = DOMAIN
  private listLoading!: boolean
  private tabPosition!: string
  private id!: string
  private info: any = {
    name: '',
    isApprove: '',
    roomTotal: '',
    region: '',
    address: '',
    note: '',
    images: [],
    createTime: '',
    updateTime: ''
  }
  private data() {
    return {
      listLoading: false,
      tabPosition: 'top',
      id: ''
    }
  }
  private created() {
    this.getInfo(this.getId())
  }
  private loading(boolean: boolean): void {
    this.listLoading = boolean
  }
  private getId() {
    this.id = this.$route.params.id
    return this.id
  }
  private router() {
    this.$router.push({
      path: '/hostel/edit/' + this.id
    })
  }
  private getInfo(id: string) {
    this.loading(true)
    const query = {
      id: this.id
    }
    fetchHostelDetail(query)
      .then((response: Ajax.AxiosResponse) => {
        const status = parseInt(response.data.status as string, 10)
        if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
          const dataList = response.data.data
          this.info = dataList
          this.info.region =
            this.info.province + ' ' + this.info.city + ' ' + this.info.county
        } else {
          this.$message({
            message: response.data.data.detail,
            type: 'error'
          })
        }
      })
      .finally(() => {
        this.loading(false)
      })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-tag {
  margin: 0 3px;
}
</style>

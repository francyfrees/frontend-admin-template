<template>
  <div class="container-fluid">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane :label="$t('hostel.label.list')">
        <div class="container-fluid">
          <!-- 搜索 -->
          <div class="filter-bar">
            <div class="left">
              <search-form
                :placeholder="$t('hostel.label.search')"
                @handleSearch="handleFilter"
                @handleEmptySearch="getData"
              />
            </div>
            <div class="right">
              <el-row :gutter="10">
                <el-col
                  :xs="24"
                  :sm="24"
                  :md="24"
                  :lg="24"
                  :xl="24"
                >
                  <router-link :to="'add'">
                    <el-button
                      class="btn-add"
                      type="success"
                      icon="el-icon-plus"
                      plain
                    >
                      {{ $t('operation.add') }}
                    </el-button>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- 列表 -->
          <el-table
            v-loading="listLoading"
            :element-loading-text="$t('loading.loadingText')"
            :data="list"
            border
            style="width: 100%"
          >
            <el-table-column
              :label="$t('hostel.name')"
              prop="name"
              min-width="180"
            >
              <template slot-scope="scope">
                <router-link
                  :to="'detail/' + scope.row.homeId"
                  class="link-type"
                >
                  {{ scope.row.name }}
                </router-link>
              </template>
            </el-table-column>
            <template v-if="device !== 'mobile'">
              <!-- 民宿图片 -->
              <el-table-column
                :label="$t('hostel.logo')"
                prop="logo"
                width="140"
                align="center"
              >
                <template slot-scope="scope">
                  <img
                    v-if="scope.row.logo"
                    :src="domain + scope.row.logo"
                    class="img-size-50"
                  >
                  <span v-else> 暂无图片 </span>
                </template>
              </el-table-column>

              <!-- 客房总数 -->
              <el-table-column
                :label="$t('hostel.roomTotal')"
                prop="roomTotal"
                width="140"
                align="center"
              />

              <!-- 民宿状态 -->
              <el-table-column
                :label="$t('hostel.status')"
                prop="status"
                width="90"
                align="center"
              >
                <template slot-scope="scope">
                  <el-tag
                    :type="
                      scope.row.status | statusFilterByTag('hostelAuditState')
                    "
                  >
                    {{
                      scope.row.status
                        | statusFilterConverter('hostelAuditState')
                    }}
                  </el-tag>
                </template>
              </el-table-column>

              <!-- 是否认证 0: 未认证 1：已认证 -->
              <el-table-column
                :label="$t('hostel.isApprove')"
                prop="isApprove"
                width="90"
                align="center"
              >
                <template slot-scope="scope">
                  {{ scope.row.status | statusFilterConverter('approveState') }}
                </template>
              </el-table-column>

              <!-- 更新时间 -->
              <el-table-column
                :label="$t('hostel.updateTime')"
                prop="updateTime"
                width="200"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.updateTime | formatTime }}</span>
                </template>
              </el-table-column>
            </template>
            <el-table-column
              :label="$t('operation.operation')"
              fixed="right"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    {{ $t('operation.operation') }}
                    <i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <router-link :to="'detail/' + scope.row.homeId">
                        {{ $t('operation.details') }}
                      </router-link>
                    </el-dropdown-item>
                    <template>
                      <el-dropdown-item>
                        <router-link :to="'edit/' + scope.row.homeId">
                          {{ $t('operation.edit') }}
                        </router-link>
                      </el-dropdown-item>
                    </template>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="pagination-container">
            <el-pagination
              :current-page="query.page"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="query.limit"
              :total="total"
              layout="total, sizes, prev, pager, next"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import searchForm from '@/components/SearchForm/index.vue'

import { fetchHostel } from '@/api/hostel'

import configCode from '@/config/configCode'
const {
  HTTP_RESPONSE_STATUS_SUCCESS,
  CONFIRM_CONTENT,
  CONFIRM_TITLE,
  DOMAIN
} = configCode

@Component({
  components: {
    searchForm
  }
})
export default class IdentifyCompanyList extends Vue {
  private domain: string = DOMAIN
  private listLoading!: boolean
  private tabPosition!: string
  private total!: number
  private list!: any[]
  private query: any = {
    page: 1,
    limit: 10,
    search: null
  }
  private data() {
    return {
      listLoading: false,
      tabPosition: 'top',
      total: 0,
      list: []
    }
  }
  get device() {
    return this.$store.state.app.device
  }
  private created() {
    this.getList()
  }
  private loading(boolean: boolean): void {
    this.listLoading = boolean
  }
  private getList(): void {
    this.loading(true)
    fetchHostel(this.query)
      .then((response: Ajax.AxiosResponse) => {
        const status = parseInt((response.data.status) as string, 10)
        if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
          const { total, list } = response.data.data
          this.total = total
          this.list = list
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
  private handleSizeChange(val: number): void {
    this.query.limit = val
    this.getList()
  }
  private handleCurrentChange(val: number): void {
    this.query.page = val
    this.getList()
  }
  private getData(): void {
    this.getList()
  }
  private handleFilter(val: string) {
    this.loading(true)
    this.query.search = val
    this.getList()
  }
}
</script>

<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          Oops!
        </h1>
        <h2>
          很抱歉，你没有权限去该页面
        </h2>
        <el-button
          icon="el-icon-arrow-left"
          type="primary"
          @click="back"
        >
          返回首页
        </el-button>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGif"
          class="err_pic"
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@/assets/img/401.png'

export default {
  data() {
    return {
      errGif: errGif + '?' + Number(new Date())
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.errPage-container {
  margin: 0 auto;
  padding-top: 100px;
  width: 800px;
  .err_pic {
    width: 100%;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

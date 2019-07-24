<template>
  <section class="error container">
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ message }}
    </h2>
    <a
      class="link"
      @click="$router.go(-1)"
    >返回上一页</a>
    <a
      class="link"
      @click="$router.push('/')"
    >返回首页</a>
  </section>
</template>
<script>
export default {
  layout: 'base',
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  head() {
    return {
      title: this.error.statusCode,
    }
  },
  computed: {
    message() {
      const infoMap = {
        404: '啊哦，网页被外星人带走了',
        500: '啊哦，服务器开了点小差',
      }
      return infoMap[this.error.statusCode]
    },
  },
}
</script>
<style lang="scss" scoped>
.error {
  text-align: center;
  .title {
    font-size: 80px;
    font-weight: 500;
    letter-spacing: 10px;
  }
  .info {
    font-weight: 300;
    color: #666;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .link {
    color: $main-color;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="article-list">
    <ul class="items">
      <li v-for="(item,index) in articleList" class="item" :key="index">
        <nuxt-link class="title" :to="{name:'article',params:{id:item.date}}">{{item.title}}</nuxt-link>
        <article class="content">{{item.content | markdownParse | cutString(200)}}</article>
      </li>
    </ul>
    <div class="tips" v-if="articleList.length === 0 && this.$route.name === 'search'">
      <p>没有搜索到和<strong>{{ change }}</strong>相关的文章！</p>
    </div>
    <div class="tips" v-if="articleList.length === 0 && this.$route.name !== 'search'">
      <p>哇哦，一篇文章都没有!</p>
    </div>
    <div class="page" v-show="maxPage > 1">
      <nuxt-link v-if="page > 1" :to="{name:routerName,params:{change:change,page:page - 1}}" class="prev">《上一页</nuxt-link>
      <a v-else class="disabled prev">《上一页</a>
      <nuxt-link v-if="hasMore" :to="{name:routerName,params:{change:change,page:page + 1}}" class="next">下一页》</nuxt-link>
      <a v-else class="disabled next">下一页》</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'article-list',
  props: {
    articleList: {
      type: Array,
      default: []
    },
    routerName: {
      type: String,
      default: ''
    }
  },

  computed: {
    maxPage () {
      return Math.ceil(Number(this.$store.state.total) / 15)
    },
    // 归档或者标签所对应的文章列表
    change () {

      return this.$route.params.change
    },
    page () {
      console.log(Number(this.$route.params.page) || 1)
      return Number(this.$route.params.page) || 1
    },
    hasMore () {
      return this.page < this.maxPage
    }
  }
}
</script>
<style lang="scss">
@import '~assets/css/var.scss';
.article-list {
  flex: 1;
  background-color: #FFF;
  padding: 15px 18px;
  .item+.item {
    border-top: 1px dashed #F1F1F1;
  }
  .title {
    font-size: 18px;
    margin: 15px auto;
  }
  .content {
    margin-bottom: 20px;
  }
  .tips {
    text-align: center;
    padding-top: 30px;
    font-size: 18px;
    strong {
      color: red;
    }
  }
}
</style>
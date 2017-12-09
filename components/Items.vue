<template>
  <div class="article-list">
    <ul class="items">
      <li v-for="(item,index) in articleList" class="item" :key="index">
        <nuxt-link class="title" :to="{name:'article-id',params:{id:item.date}}">{{item.title}}</nuxt-link>
        <article class="content">{{item.content | markdownParse | cutString(200)}}</article>
      </li>
    </ul>
    <div class="tips" v-if="articleList.length === 0 && this.$route.name === 'search'">
      <p>没有搜索到和<strong>{{ category }}</strong>相关的文章！</p>
    </div>
    <div class="tips" v-if="articleList.length === 0 && this.$route.name !== 'search'">
      <p>哇哦，一篇文章都没有!</p>
    </div>
    <div class="page" v-show="maxPage > 1">
      <a v-if="page > 1" class="prev" @click="prevPage">《上一页</a>
      <a v-else class="disabled prev">《上一页</a>
      <a v-if="hasMore" class="next" @click="nextPage">下一页》</a>
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
    }
  },
  methods: {
    prevPage() {
      if (this.category) {
        this.$router.push({
          params: {
            category: this.category,
            page: this.page - 1
          }
        })
      } else {
        // 从首页跳转过来的
        this.$router.push({
          name: 'top-page',
          params: {
            category: 'top',
            page: this.page - 1
          }
        })
      }
    },
    nextPage() {
      if (this.category) {
        this.$router.push({
          params: {
            category: this.category,
            page: this.page + 1
          }
        })
      } else {
        // 从首页跳转过来的
        this.$router.push({
          name: 'top-page',
          params: {
            category: 'top',
            page: this.page + 1
          }
        })
      }
    }
  },
  computed: {
    maxPage() {
      return Math.ceil(Number(this.$store.state.total) / 15)
    },
    // 归档或者标签所对应的文章列表
    category() {
      return this.$route.params.category
    },
    page() {
      return Number(this.$route.params.page) || 1
    },
    hasMore() {
      return this.page < this.maxPage
    }
  }
}
</script>
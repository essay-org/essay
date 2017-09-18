<template>
  <div class="article-list">
    <ul class="items">
      <li v-for="(item,index) in data" class="item" :key="index">
        <router-link class="title" :to="{name:'article',params:{id:item.date}}">{{item.title}}</router-link>
        <article class="content">{{item.content | markdownParse | cutString(200)}}</article>
      </li>
    </ul>
    <div class="tips" v-if="data.length === 0 && this.$route.name === 'search'">
      <p>没有搜索到和<strong>{{ change }}</strong>相关的文章！</p>
    </div>
    <div class="tips" v-if="data.length === 0 && this.$route.name !== 'search'">
      <p>哇哦，一篇文章都没有!</p>
    </div>
    <div class="page" v-show="maxPage > 1">
      <router-link v-if="page > 1" :to="{name:type,params:{change:change,page:page - 1}}" class="prev">《上一页</router-link>
      <a v-else class="disabled prev">《上一页</a>
      <router-link v-if="hasMore" :to="{name:type,params:{change:change,page:page + 1}}" class="next">下一页》</router-link>
      <a v-else class="disabled next">下一页》</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArticleList',
  title () {
    return 'vueblog'
  },
  beforeMount () {
    if (this.$root._isMounted) {
      this.listPage()
    }
  },
  props: ['type'],
  computed: {
    data () {
      return this.$store.state.articleList
    },
    maxPage () {
      return Math.ceil(Number(this.$store.state.total) / 15)
    },
    change () {
      return this.$route.params.change
    },
    page () {
      return Number(this.$route.params.page) || 1
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },
  watch: {
    $route (to, from) {
      this.listPage()
    }
  },
  methods: {
    // 点击分页后，重新获取数据
    listPage () {
      this.$bar.start()
      this.$store.dispatch('LIST_PAGE').then(() => {
        this.$bar.finish()
      })
    }
  }
}
</script>

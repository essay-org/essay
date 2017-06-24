<template>
  <div class="article-list">
    <ul class="items">
      <li v-for="(item,index) in data" class="item" :key="index">
        <router-link class="title" :to="{name:'article',params:{id:item.date}}">{{item.title}}</router-link>
        <article class="content">{{item.content | formatHtml | cutString(200)}}</article>
        <!-- <span class="date"> {{item.date | formatDate('yyyy-MM-dd hh:mm')}}</span> -->
      </li>
    </ul>
    <div class="page" v-show="maxPage > 1">
      <router-link v-if="page > 1" :to="{name:'index',params:{id:page - 1}}" class="prev">《上一页</router-link>
      <a v-else class="disabled prev">《上一页</a>
      <router-link v-if="hasMore" :to="{name:'index',params:{id:page + 1}}" class="next">下一页》</router-link>
      <a v-else class="disabled next">下一页》</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'articleList',
  title(){
    return 'vueblog'
  },
  beforeMount() {
    if (this.$root._isMounted) {
      this.indexdata()
    }
  },
  computed: {
    data() {
      // console.log(this.$store.state.articleList[0].content)
      return this.$store.state.articleList
    },
    maxPage() {
      return Math.ceil(Number(this.$store.state.number) / 15)
    },
    page() {
      return Number(this.$route.params.id) || 1
    },
    hasMore() {
      return this.page < this.maxPage;
    }
  },
  watch: {
    $route(to, from) {
      this.indexdata()
    }
  },
  methods: {
    indexdata() {
      this.$store.dispatch('INDEXDATA')
    }
  }
}
</script>

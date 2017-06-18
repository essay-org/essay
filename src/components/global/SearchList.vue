<template>
  <div class="search-list">
    <ul class="items">
      <li v-for="(item,index) in data" class="item" :key="index">
        <router-link class="title" :to="{name:'article',params:{id:item.date}}">{{item.title}}</router-link>
        <article class="content markdown-body">{{item.content | formatHtml | cutString(200)}}</article>
        <span class="date"> {{item.date | formatDate('yyyy-MM-dd hh:mm')}}</span>
      </li>
    </ul>
    <div class="tips" v-show="data.length === 0">
      <p>没有搜索到和<strong>{{ info }}</strong>相关的信息！</p>
    </div>
    <div class="page" v-show="maxPage > 1">
      <router-link v-if="page > 1" :to="{name:'searchID',params:{info:info,id:page - 1}}" class="prev">《上一页</router-link>
      <a v-else class="disabled prev">《上一页</a>
      <router-link v-if="hasMore" :to="{name:'searchID',params:{info:info,id:page + 1}}" class="next">下一页》</router-link>
      <a v-else class="disabled next">下一页》</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'searchList',
  title() {
    return 'vueblog'
  },
  beforeMount() {
    if (this.$root._isMounted) {
      this.searchdata()
    }
  },
  computed: {
    data() {
      return this.$store.state.searchlist
    },
    maxPage() {
      return Math.ceil(Number(this.$store.state.number) / 15)
    },
    page() {
      return Number(this.$route.params.id) || 1
    },
    info() {
      return this.$route.params.info
    },
    hasMore() {
      return this.page < this.maxPage;
    }
  },
  watch: {
    $route(to, from) {
      this.searchdata()
    }
  },
  methods: {
    searchdata() {
      this.$store.dispatch('SEARCHDATA')
    }
  }
}
</script>

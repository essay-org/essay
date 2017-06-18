<template>
  <div class="bytag">
    <div class="article-list">
      <ul class="items">
        <li v-for="(item,index) in data" :key="index" class="item">
          <router-link class="title" :to="{name:'article',params:{id:item.date}}">{{item.title}}</router-link>
          <article class="content" v-html="item.content"></article>
          <span class="date"> {{item.date | formatDate('yyyy-MM-dd hh:mm')}}</span>
        </li>
      </ul>
      <div class="page">
        <router-link v-if="page > 1" :to="{name:'categoryID',params:{tag:tag,id:page - 1}}" class="prev">《上一页</router-link>
        <a v-else class="disabled prev">《上一页</a>
        <router-link v-if="hasMore" :to="{name:'categoryID',params:{tag:tag,id:page + 1}}" class="next">下一页》</router-link>
        <a v-else class="disabled next">下一页》</a>
      </div>
    </div>
  </div>
</template>
<script>
import '../../../static/simplemde/simplemde.css'
import '../../../static/github-markdown/github-markdown.css'
import '../../../static/github-markdown/atom-one-light.css'
export default {
  name: 'byTag',
  title(){
    return 'vueblog'
  },
  beforeMount() {
    this.byTagData()
  },
  /*beforeDestroy(){
    this.byTagData()
  },*/
  computed: {
    data() {
      return this.$store.state.byTag
    },
    maxPage() {
      return Math.ceil(Number(this.$store.state.byTagNumber) / 15)
    },
    page() {
      return Number(this.$route.params.id) || 1
    },
    tag() {
      return this.$route.params.tag
    },
    hasMore() {
      return this.page < this.maxPage;
    }
  },
  watch: {
    $route(to, from) {
      this.byTagData()
    }
  },
  methods: {
    byTagData() {
      this.$store.dispatch('BYTAGDATA')
    }
  }
}
</script>
<template>
    <div class="bytag-list">
      <ul class="items">
        <li v-for="(item,index) in data" :key="index" class="item">
          <router-link class="title" :to="{name:'article',params:{id:item.date}}">{{item.title}}</router-link>
          <article class="content">{{item.content | formatHtml | cutString(200)}}</article>
        </li>
      </ul>
      <div class="page" v-show="maxPage > 1">
        <router-link v-if="page > 1" :to="{name:'archiveID',params:{date:date,id:page - 1}}" class="prev">《上一页</router-link>
        <a v-else class="disabled prev">《上一页</a>
        <router-link v-if="hasMore" :to="{name:'archiveID',params:{date:date,id:page + 1}}" class="next">下一页》</router-link>
        <a v-else class="disabled next">下一页》</a>
      </div>
    </div>
</template>
<script>
export default {
  name: 'byArchiveList',
  title(){
    return 'vueblog'
  },
  beforeMount() {
    this.byArchiveData()
  },
  /*beforeDestroy(){
    this.byArchiveData()
  },*/
  computed: {
    data() {
      console.log(this.$store.state.byArchive)
      return this.$store.state.byArchive
    },
    maxPage() {
      return Math.ceil(Number(this.$store.state.byArchiveNumber) / 15)
    },
    page() {
      return Number(this.$route.params.id) || 1
    },
    date() {
      return this.$route.params.date
    },
    hasMore() {
      return this.page < this.maxPage;
    }
  },
  watch: {
    $route(to, from) {
      this.byArchiveData()
    }
  },
  methods: {
    byArchiveData() {
      this.$store.dispatch('ARCHIVEDATA').then((res) => {
        console.log(this.$store.state.byArchive)
      } )
    }
  }
}
</script>
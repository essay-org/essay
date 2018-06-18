<template>
  <div class="search container">
    <div v-if="$route.params.id">
      <div class="search-result">
        <p>找到{{ articles.length }}篇和 <span>{{ keyword }}</span> 相关的文章</p>
        <top-list :articles="articles" />
      </div>
    </div>
    <div v-else>
      <div class="search-wrap">
        <h3>文章搜索</h3>
        <label>
          <input type="text" v-model="keyword" @keyup.enter="search" autofocus placeholder="回车搜索" maxlength="30">
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ store, route }) {
    let id = route.params.id || ''
    const { data } = await store.dispatch('SEARCH', id)
    return {
      articles: data || []
    }
  },
  head() {
    return {
      title: '搜索 - ' + this.$store.state.user.nickname
    }
  },
  data() {
    return {
      keyword: this.$route.params.id || ''
    }
  },
  methods: {
    search() {
      if (this.keyword === '') { return false }
      let keyword = encodeURIComponent(this.keyword)
      this.$router.push(`/search/${keyword}`)
    }
  }
}

</script>

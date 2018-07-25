<template>
  <div class="search container">
    <div v-if="$route.params.id">
      <div class="search-result">
        <p>找到{{ $store.state.searchArticles.length }}篇和 <span>{{ keyword }}</span> 相关的文章</p>
        <top-list :articles="$store.state.searchArticles" />
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
  async fetch({ store, route }) {
    let id = decodeURIComponent(route.params.id) || ''
    await store.dispatch('SEARCH', id)
  },
  head() {
    return {
      title: '搜索 - ' + this.$store.state.user.nickname
    }
  },
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    search() {
      let keyword = encodeURIComponent(this.keyword) || encodeURIComponent(this.$route.params.id)
      if (!keyword) { return false }
      this.$router.push({
        name: 'search-id',
        params: {
          id: keyword
        }
      })
    }
  }
}

</script>

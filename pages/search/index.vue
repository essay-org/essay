<template>
  <div class="category-list">
    <div class="search-box">
      <h3>文章搜索</h3>
      <input type="search" name="search" placeholder="search" v-model="searchInfo" autofocus @keyup.enter="search">
    </div>
  </div>
</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      searchInfo: ''
    }
  },
  methods: {
    search () {
      if (this.searchInfo === '') {
        this.$router.push('/search')
        return
      }
      this.$router.push({
        name: 'search-category-page',
        params: {
          category: this.searchInfo
        }
      })
    }
  }
}
</script>

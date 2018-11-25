<template>
  <div class="search">
    <div v-if="$route.params.id">
      <div class="search-result">
        <p class="result-des">找到{{ total }}篇和 <span>{{ decodeURIComponent(keyword) }}</span> 相关的文章</p>
        <blog-list :articles="searchArticles" />
        <wmui-pagination 
          :limit="limit" 
          :total="total" 
          :currentPage="currentPage"
          @pageClick="pageClick"/>
      </div>
    </div>
    <div v-else>
      <div class="search-wrap">
        <h3>文章搜索</h3>
        <label>
          <input 
            type="text" 
            v-model="keyword" 
            @keyup.enter="search" 
            autofocus placeholder="回车搜索" 
            maxlength="30">
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  fetch({ store, route }) {
    let id = route.params.id || ''
    if(id) {
      return store.dispatch('SEARCH', {id, page: 1})
    }
  },
  head() {
    return {
      title: '搜索 - ' + this.user.nickname
    }
  },
  data() {
    return {
      keyword: this.$route.params.id || '',
      currentPage: 1,
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
    },
    pageClick(i) {
      this.currentPage = i
      this.$store.dispatch('SEARCH', {id: this.$route.params.id, page: i})
    }
  },
  computed: mapState([
    'user',
    'searchArticles',
    'limit',
    'page',
    'total',
  ])
}

</script>

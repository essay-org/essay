<template>
  <div>
    <template v-if="hasID">
      <list :articles="articles"></list>
    </template>
    <template v-else>
      <div class="search">
        <h3 class="search-title">文章搜索</h3>
        <div class="search-form">
          <input type="text" v-model="keyword" @keyup.enter="search" autofocus>
          <button @click="search" class="black-button">搜索</button>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import List from '~/components/List.vue'
export default {
  async asyncData({ store, route }) {
    let id = route.params.id || ''
    let data = await store.dispatch('SEARCH', id)
    if (route.params.id) {
      // articles
      if (data.success) {
        return {
          hasID: true,
          articles: data.data
        }
      }
    } else {
      if (data.success) {
        return {
          hasID: false,
          articles: []
        }
      }
    }
  },
  head () {
    return {
      title: '搜索 - VueBlog'
    }
  },
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    search() {
      if (this.keyword === '') {
        return
      } else {
        let keyword = encodeURIComponent(this.keyword)
        this.$router.push(`/search/${keyword}`)
      }
    }
  },
  components: {
    List
  }
}

</script>

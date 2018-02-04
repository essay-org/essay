<template>
  <div class="index">
    <list :articles="articles"></list>
    <div class="page" v-if="maxPage > 1">
      <a v-if="page > 1" class="page-prev" @click="prevPage">《上一页</a>
      <a v-else class="disabled page-prev">《上一页</a>
      <a v-if="hasMore" class="page-next" @click="nextPage">下一页》</a>
      <a v-else class="disabled page-next">下一页》</a>
    </div>
  </div>
</template>
<script>
import List from '~/components/List.vue'
export default {
  async asyncData({store, route}) {
    let page = route.params.id || 1
    let data = await store.dispatch('ARTICLES', page)
    if(data.success) {
      return {
        articles: data.data,
        total: data.total
      }
    } else {
      return {
        articles: [],
        total: 0
      }
    }
  },

  methods: {
    prevPage() {
      this.$router.push({
        name: 'page-id',
        params: {
          id: this.page - 1
        }
      })
    },
    nextPage() {
      this.$router.push({
        name: 'page-id',
        params: {
          id: this.page + 1
        }
      })
    }
  },

  computed: {
    maxPage () {
      return Math.ceil(Number(this.total) / 15)
    },
    page () {
      return Number(this.$route.params.id) || 1
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },

  components: {
    List
  }
}

</script>

<template>
  <div class="index container">
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
  mounted () {

    let articles = this.articles
    let arr = [],
    arr2 = [],
    year, month, date
  for (let i = 0; i < articles.length; i++) {
    year = new Date(articles[i].createdAt).getFullYear() + ''
    month = new Date(articles[i].createdAt).getMonth() + 1 + ''
    if (month.length === 1) {
      month = '0' + month;
    }
    date = `${year}年${month}月`
    arr.push({
      date: date,
      article: articles[i]
    })
  }

  // arr.sort()
    console.log(arr)
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

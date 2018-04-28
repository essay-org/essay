<template>
  <div class="index">
    <top-lists :articles="articles"/>
    <div class="page" v-if="maxPage > 1">
      <div class="page-prev">
        <a v-if="page > 1" @click="prevPage">« Prev </a>
      </div>
      <div class="page-next">
        <a v-if="hasMore" @click="nextPage">Next »</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({store, route}) {
    let page = route.params.id || 1
    const data  = await store.dispatch('ARTICLES', page)
    return {
      articles: data.data || [],
      total: data.total
    }
  },

  head() {
    return {
      title: this.$store.state.user.nickname,
      meta: [
        { description: 'VueBlog是一个基于Vuejs开发的小型博客应用，让你可以为所欲为的分享自己的知识和创作' }
      ]
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
    maxPage() {
      return Math.ceil(Number(this.total) / 15)
    },
    page() {
      return Number(this.$route.params.id) || 1
    },
    hasMore() {
      return this.page < this.maxPage
    }
  }
}

</script>
<style lang="scss" scoped>
@import '~/assets/css/var.scss';
  .page {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
    margin: 30px auto;
     .page-prev {
      width: 50%;
      text-align: left;
    }
    .page-next {
      width: 50%;
      text-align: right;
    }
    a {
      color: $link-color;
    }
  }
</style>

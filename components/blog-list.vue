<template>
  <div class="blog-list">
    <section class="list">
      <div
        v-for="item in list"
        :key="item.id"
        class="item"
      >
        <span class="time">{{ item.createdAt | formatDate('yyyy-MM-dd') }}</span>
        <nuxt-link :to="`/posts/${item.id}`"><span
          v-if="item.status === 3"
          class="top"
        >[置顶] </span>{{ item.title }}</nuxt-link>
      </div>
    </section>

    <section class="page">
      <button
        :disabled="currentPage == 1"
        class="prev small"
        @click="handlePrev"
      >上一页</button>
      <span> {{ currentPage }} / {{ totalPage }}</span>
      <button
        :disabled="currentPage == totalPage"
        class="next small"
        @click="handleNext"
      >下一页</button>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BlogList',
  props: {
    isDraft: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState([
      'articles',
      'articlesTop',
      'limit',
      'total',
    ]),
    list() {
      return this.articlesTop.concat(this.articles)
    },
    currentPage() {
      return Number(this.$route.query.page) || 1
    },
    totalPage() {
      return Math.ceil(this.total / this.limit) || 1
    },
  },
  watch: {
    '$route': function (newValue, oldValue) {
      this.checkQuery(newValue.query)
    }
  },
  mounted() {
    // const { page = 1, keywords = '', category = '' } = this.$route.query
    // this.checkQuery(page)
  },
  methods: {
    ...mapActions([
      'getArticles',
    ]),

    handlePrev() {
      const page = this.currentPage - 1 > 0
        ? this.currentPage - 1
        : 1

      this.$router.push(`/?page=${page}`)
    },

    handleNext() {
      const page = this.currentPage + 1 > this.totalPage
        ? this.currentPage
        : this.currentPage + 1

      this.$router.push(`/?page=${page}`)
    },
    checkQuery(query) {
      // 判断合法值
      const { page = 1, keywords = '', category = '' } = query
      if (+page <= this.totalPage && +page >= 1) {
        if (this.isDraft) {
          this.getDrafts({
            page,
          })
        } else {
          this.getArticles({
            page,
            keywords,
            category,
          })
        }
        return
      }
      this.$router.replace('/404')
    },
  },
}
</script>

<style lang="scss" scoped>
.blog-list {
  .list {
    .item {
      font-size: 16px;
      margin-bottom: 20px;
      .time {
        color: #999;
        margin-right: 10px;
      }
      .top {
        color: $main-color;
      }
    }
  }
  .page {
    margin-bottom: 30px;
    button {
      padding: 15px 30px;
    }
  }
}
</style>

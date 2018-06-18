<template>
  <div class="admin-private">
    <ul class="private-list">
      <li class="list-item" v-for="(article, index) in articles" :key="index">
        <p class="item-title truncation"><nuxt-link :to="'/detail/'+article.id" class="item-title">{{article.title}}</nuxt-link></p>
        <p class="item-date">{{article.updatedAt | formatDate('yyyy-MM-dd')}}</p>
        <p class="item-del"><a @click="del(article.id)">删除</a></p>
        <p class="item-edit"><a @click="edit(article.id)">编辑</a></p>
      </li>
    </ul>
    <top-tip ref="tip"/>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      articles: []
    }
  },
  mounted() {
    this.$store.dispatch('PRIVATE_ARTICLES').then((data) => {
      this.articles = data.data
    })
  },
  head() {
    return {
      title: '草稿箱 - ' + this.$store.state.user.nickname
    }
  },
  methods: {
    del(id) {
      this.$store.dispatch('DELETE_ARTICLE', id).then((data) => {
        if(data.success) {
          this.$refs.tip.openTip('草稿删除完成')
          this.$store.dispatch('PRIVATE_ARTICLES').then((data) => {
            this.articles = data.data
          })
        }
      })
    },
    edit(id) {
      this.$router.push(`/admin/publish/${id}`)
    }
  }
}

</script>


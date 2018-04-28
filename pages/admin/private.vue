<template>
  <div class="admin-private">
    <ul class="private-list">
      <li class="list-item" v-for="(article, index) in articles" :key="index">
        <p class="item-title"><nuxt-link :to="'/detail/'+article.id">{{article.title}}</nuxt-link></p>
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

<style lang="scss" scoped>
@import '~/assets/css/var.scss';
.admin-private {
  max-width: 960px;
  margin: 60px auto;
  .list-item {
    display: flex;
    line-height: 45px;
    border-top: 1px solid #eee;
     .item-date {
      flex: 1;
      text-align: center;
    }
     .item-edit,
     .item-del {
      width: 60px;
      text-align: right;
    }
    .item-title {
      flex: 1;
    }
    &:nth-child(1) {
      border-top: none;
    }
  }
}
</style>

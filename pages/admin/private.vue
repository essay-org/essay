<template>
  <div class="admin-private container">
    <ul class="private-list">
      <li class="list-item" v-for="(article, index) in articles" :key="index">
        <p class="item-title"><a>{{article.title}}</a></p>
        <p class="item-date">{{article.updatedAt}}</p>
        <p class="item-del"><a @click="del(article.id)">删除</a></p>
        <p class="item-edit"><a @click="edit(article.id)">编辑</a></p>
      </li>
    </ul>
    <Tip ref="tip"></Tip>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  async asyncData({store}) {
    let data = await store.dispatch('PRIVATE_ARTICLES')
    if(data.success) {
      return {
        articles: data.data
      }
    } else {
      return {
        articles: []
      }
    }
  },

  methods: {
    del(id) {
      this.$store.dispatch('DELETE_ARTICLE', id).then((data) => {
        if(data.success) {
          this.$refs.tip.openTip('草稿删除完成')
          this.$store.dispatch('PRIVATE_ARTICLES').then(data => {
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

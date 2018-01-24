<template>
  <div class="detail container">
    <p class="detail-title">{{ article.title }}</p>
    <div class="detail-meta">
      <p class="meta meta-created">发布时间：{{ article.createdAt }}</p>
      <p class="meta meta-updated">更新时间：{{ article.updatedAt }}</p>
      <p class="meta meta-tags" v-if="article.tags.length">标签：<span v-for="(tag, index) in article.tags" :key="index">{{ tag.name }}</span></p>
    </div>
    <div class="detail-content">
      <p>{{ article.content }}</p>
    </div>
    <div class="detail-admin">
      <p class="admin-del"><a @click="del(article.id)">删除</a></p>
      <p class="admin-edit"><a @click="edit(article.id)">编辑</a></p>
    </div>
    <Tip ref="tip"></Tip>
  </div>
</template>
<script>
  export default {
    async asyncData({store, route}) {
      let id = route.params.id
      let data = await store.dispatch('ARTICLE_DETAIL', id)
      if(data.success) {
        return {
          article: data.data
        }
      }
    },
    methods: {
      del (id) {
        this.$store.dispatch('DELETE_ARTICLE', id).then(data => {
          if(data.success) {
            this.$refs.tip.openTip('文章已删除')
            this.$router.go(-1)
          }
        })
      },
      edit (id) {
       this.$router.push(`/admin/publish/${id}`)
      }
    }
  }
</script>

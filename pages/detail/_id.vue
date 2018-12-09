<template>
  <div class="detail">
    <h1 class="detail-title">{{ articleDetail.title }}</h1>
    <div class="detail-content">
      <wmui-preview :content="articleDetail.content" />
    </div>
    <p class="detail-tags">
      <nuxt-link v-for="(tag, index) in articleDetail.tags" :key="index" :to="'/tags/' + tag.id"># {{ tag.name }}</nuxt-link>
    </p>
    <div class="detail-admin">
      <p>发布于 {{ articleDetail.created_at | formatDate('yyyy-MM-dd') }}</p>
      <p> 更新于 {{ articleDetail.updated_at | formatDate('yyyy-MM-dd') }}</p>
      <p> 浏览{{ articleDetail.views }}次</p>
      <p class="admin-del" v-if="adminToken"><a @click="del(articleDetail.id)">删除</a></p>
      <p class="admin-edit" v-if="adminToken"><a @click="edit(articleDetail.id)">编辑</a></p>
    </div>
    <div v-if="app.isGithubConfig">
      <blog-comment 
      :comment-list="articleDetail.comments" 
      :article-id="articleDetail.id" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { cutString } from '~/plugins/filters'
export default {
  fetch({ store, route }) {
    let id = route.params.id || ''
    return store.dispatch('ARTICLE_DETAIL', route.params.id || '')
  },
  head() {
    return {
      title: `${this.articleDetail.title} - ${this.user.nickname}`,
      meta: [
        { description: cutString(this.articleDetail.content, 300) }
      ]
    }
  },
  computed: {
    ...mapState([
      'user',
      'adminToken',
      'articleDetail',
      'app',
    ]),
  },
  methods: {
    del(id) {
      let _self = this
      this.$Modal.confirm({
        title: '确定要删除该文章吗？',
        text: '删除后不可恢复',
        onConfirm(instance) {
          _self.$store.dispatch('DELETE_ARTICLE', id).then(data => {
            if (data.success) {
              _self.$router.go(-1)
            }
          })
          instance.open = false
        },
        onCancel(instance) {
          instance.open = false
        }
      })
    },
    edit(id) {
      this.$router.push(`/admin/posts/${id}`)
    }
  }
}

</script>

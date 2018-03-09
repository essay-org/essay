<template>
  <div class="detail container">
    <p class="detail-title" v-if="article.flag == 2"><a :href="article.link" target="_blank">{{ article.title }}</a></p>
    <p class="detail-title" v-else>{{ article.title }}</p>
    <div class="detail-meta">
      <p class="meta meta-created">发布：{{ article.createdAt | formatDate('yyyy-MM-dd') }}</p>
      <p class="meta meta-updated">更新：{{ article.updatedAt | formatDate('yyyy-MM-dd') }}</p>
      <p class="meta meta-view">浏览：{{ article.views }} 次</p>
      <p class="meta meta-tags">标签：<span v-for="(tag, index) in article.tags" :key="index">{{ tag.name }}</span></p>
    </div>
    <div class="detail-content">
      <top-preview :content="article.content" :options="options"></top-preview>
    </div>
    <div class="detail-admin" v-if="isLogin">
      <p class="admin-del"><a @click="del(article.id)">删除</a></p>
      <p class="admin-edit"><a @click="edit(article.id)">编辑</a></p>
    </div>
    <Tip ref="tip"></Tip>
  </div>
</template>
<script>
import TopPreview from 'top-editor/src/lib/TopPreview.vue'
export default {
  async asyncData({ store, route }) {
    let id = route.params.id
    let data = await store.dispatch('ARTICLE_DETAIL', id)
    if (data.success) {
      return {
        article: data.data
      }
    } else {
      return {
        article: {}
      }
    }
  },
  head () {
    return {
      title: `${this.article.title} - VueBlog`
    }
  },
  data () {
    return {
      options: {},
      isLogin: this.$store.state.token ? true : false
    }
  },

  mounted() {
    if (process.browser) {
      this.options = {
        linkify: true,
        highlight(str, lang = 'javascript') {
          if (require('highlight.js').getLanguage(lang)) {
            try {
              return require('highlight.js').highlight(lang, str).value
            } catch (__) {}
          }
          return ''
        }
      }
    }
  },

  methods: {
    del(id) {
      this.$store.dispatch('DELETE_ARTICLE', id).then(data => {
        if (data.success) {
          this.$refs.tip.openTip('文章已删除')
          this.$router.go(-1)
        }
      })
    },
    edit(id) {
      this.$router.push(`/admin/publish/${id}`)
    }
  },

 components: {
  TopPreview
 }
}

</script>

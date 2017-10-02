<template>
  <div class="article-detail">
    <h3 class="title">{{title}}</h3>
    <top-preview :content="content" :options="options"></top-preview>
    <div class="manage" v-show="isAdmin">
      <span><a @click="edit">编辑</a></span>
      <span><a @click="del">删除</a></span>
    </div>
  </div>
</template>
<script>
import cookies from 'js-cookie'
import hljs from 'highlight.js'
export default {
  name: 'ArticleDetail',
  data () {
    return {
      article: this.$store.state.articleDetail,
      options: {
        linkify: true,
        highlight(str, lang) {
          lang = lang || 'javascript'
          if (hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value
            } catch (__) {}
          }
          return ''
        }
      }
    }
  },
  title () {
    return this.article.title + ' | vueblog'
  },
  computed: {
    title () {
      return this.article.title
    },
    content () {
      return this.article.content
    },
    isAdmin () {
      return !!((cookies.get('token') || this.$store.state.cookies.token))
    }
  },
  methods: {
    // 前台删除文章
    del () {
      let id = this.$route.params.id
      this.axios.delete(`/article?id=${id}`).then((result) => {
        this.$toast(result.data.message)
        if (result.data.code === 200) this.$router.push({ name: 'index' })
      })
    },

    // 前台编辑文章
    edit () {
      let id = this.$route.params.id
      this.$router.push({ name: 'publish', params: { id: id } })
    }
  }
}
</script>
<style>
@import '~highlight.js/styles/github.css';
  /*@import '~gitment/style/default.css';*/
</style>
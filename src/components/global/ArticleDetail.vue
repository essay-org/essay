<template>
  <div class="article-detail">
    <h3 class="title">{{title}}</h3>
    <article class="content markdown-body" v-html="content">
    </article>
    <div class="manage" v-show="isAdmin">
      <span><a @click="edit">编辑</a></span>
      <span><a @click="del">删除</a></span>
    </div>
    <!-- <vue-gitment :options="options"></vue-gitment> -->
  </div>
</template>
<script>
// 解析markdown
import marked from 'marked'
import cookies from 'js-cookie'
// import VueGitment from 'vue-gitment'
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value
  }
})
export default {
  name: 'ArticleDetail',
  data () {
    return {
      /* options: {
        id: article.date,
        owner: 'Your GitHub ID',
        repo: 'The repo to store comments',
        oauth: {
          client_id: 'Your client ID',
          client_secret: 'Your client secret'
        }
      }, */
      article: this.$store.state.articleDetail
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
      return marked(this.article.content)
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
  },
  components: {
    // VueGitment
  }
}
</script>
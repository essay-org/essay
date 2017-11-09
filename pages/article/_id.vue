<template>
  <div class="article-detail">
    <h3 class="title">{{article.title}}</h3>
    <top-preview :content="article.content" :options="options"></top-preview>
    <!-- <div class="manage" v-show="isAdmin">
      <span><a @click="edit">编辑</a></span>
      <span><a @click="del">删除</a></span>
    </div> -->
  </div>
</template>
<script>
// import cookies from 'js-cookie'
import hljs from 'highlight.js'
export default {
  name: 'article-detail',
  async fetch({store,params}){
    await store.dispatch('ARTICLE_DETAIL',params.id)
  },
  head() {
    return {
      title: this.article.title + ' | vueblog'
    }
  },
  data () {
    return {
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
  computed: {
    article() {
      return this.$store.state.articleDetail
    },
    isAdmin () {
      return true
      // return !!((cookies.get('token') || this.$store.state.cookies.token))
    }
  },
  methods: {
    del () {
      let id = this.$route.params.id
      this.axios.delete(`/article?id=${id}`).then((result) => {
        this.$toast(result.data.message)
        if (result.data.code === 200) this.$router.push({ name: 'index' })
      })
    },

    edit () {
      let id = this.$route.params.id
      this.$router.push({ name: 'publish', params: { id: id } })
    }
  }
}
</script>
<style lang="scss">
/*@import '~highlight.js/styles/github.css';*/
@import '~assets/css/var.scss';
.article-detail {
  flex: 1;
  background-color: #FFF;
  padding: 15px 18px;
  overflow: auto;
  .title {
    margin: 20px 0;
    &::after {
      content: '';
      display: block;
      margin-top: 20px;
      border-bottom: 1px dashed $Border;
    }
  }
  .content {
    margin-bottom: 20px;
  }
  .manage {
    text-align: right;
    &::before {
      content: '';
      display: block;
      margin-top: 20px;
      border-bottom: 1px dashed $Border;
    }
    span {
      display: inline-block;
      padding: 10px 15px;
      cursor: pointer;
    }
  }
}
</style>
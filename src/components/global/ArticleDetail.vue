<template>
    <div class="article-detail">
      <h3 class="title">{{title}}</h3>
      <article class="content markdown-body" v-html="content">
      </article>
    </div>
</template>
<script>
import marked from 'marked'
import highlight from 'highlight.js'
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
    return require('highlight.js').highlightAuto(code).value;
  }
})
export default {
  name: 'articleDetail',
  data(){
    return {
      article:this.$store.state.articleDetail
    }
  },
  title() {
      return this.article.title + ' | vueblog'
  },
  computed: {
    title() {
      return this.article.title
    },
    content() {
      return marked(this.article.content)
    }
  },
  methods: {
    articleData() {
      this.$store.dispatch('ARTICLEDATA')
    }
  }
}
</script>

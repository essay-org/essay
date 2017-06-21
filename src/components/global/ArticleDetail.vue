<template>
    <div class="article-detail">
      <h3 class="title">{{article.title}}</h3>
      <article class="content markdown-body" v-html="article.content">
      </article>
    </div>
</template>
<script>
import '../../../static/github-markdown/atom-one-light.css';
export default {
  name: 'articleDetail',
  title() {
      return this.article.title + ' | vueblog'
  },
  computed: {
    article() {
      return this.$store.state.article
    }
  },
  methods: {
    articleData() {
      this.$store.dispatch('ARTICLEDATA')
    }
  }
}
</script>

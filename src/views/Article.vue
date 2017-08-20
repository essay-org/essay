<template>
  <div class="article">
    <my-header></my-header>
    <div class="container wrap">
      <article-detail></article-detail>
      <my-aside></my-aside>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue'
import MyAside from '../components/global/MyAside.vue'
import ArticleDetail from '../components/global/ArticleDetail.vue'
import MyFooter from '../components/global/MyFooter.vue'
export default {
  name: 'Article',
  components: {
    MyHeader,
    MyAside,
    ArticleDetail,
    MyFooter
  }
}
</script>
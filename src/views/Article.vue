<template>
  <div class="article">
    <my-header></my-header>
    <div class="container clearfix">
      <my-aside></my-aside>
      <article-detail></article-detail>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue';
import MyAside from '../components/global/MyAside.vue';
import ArticleDetail from '../components/global/ArticleDetail.vue';
import MyFooter from '../components/global/MyFooter.vue';
export default {
  name: 'article',
  components: {
    MyHeader,
    MyAside,
    ArticleDetail,
    MyFooter
  }
}
</script>
<template>
  <div class="index">
    <my-header></my-header>
    <div class="container clearfix">
      <my-aside></my-aside>
      <article-list></article-list>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue';
import MyAside from '../components/global/MyAside.vue';
import ArticleList from '../components/global/ArticleList.vue';
import MyFooter from '../components/global/MyFooter.vue';
export default {
  name: 'index',
  components: {
    MyHeader,
    MyAside,
    ArticleList,
    MyFooter
  }
}
</script>
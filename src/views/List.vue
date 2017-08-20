<template>
  <div class="list">
    <my-header></my-header>
    <div class="container wrap">
      <article-list></article-list>
      <my-aside></my-aside>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue'
import MyAside from '../components/global/MyAside.vue'
import ArticleList from '../components/global/ArticleList.vue'
import MyFooter from '../components/global/MyFooter.vue'
export default {
  name: 'List',
  components: {
    MyHeader,
    MyAside,
    ArticleList,
    MyFooter
  }
}
</script>
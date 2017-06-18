<template>
  <div class="search">
    <my-header></my-header>
    <div class="container clearfix">
      <my-aside></my-aside>
      <search-list></search-list>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue';
import MyAside from '../components/global/MyAside.vue';
import SearchList from '../components/global/SearchList.vue';
import MyFooter from '../components/global/MyFooter.vue';
export default {
  name: 'search',
  components: {
    MyHeader,
    MyAside,
    SearchList,
    MyFooter
  }
}
</script>
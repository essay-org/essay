<template>
  <div class="category">
    <my-header></my-header>
    <div class="container clearfix">
      <my-aside></my-aside>
      <by-tag></by-tag>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '../components/global/MyHeader.vue';
import MyAside from '../components/global/MyAside.vue';
import ByTag from '../components/global/ByTag.vue';
import MyFooter from '../components/global/MyFooter.vue';
export default {
  name: 'category',
  components: {
    MyHeader,
    MyAside,
    ByTag,
    MyFooter
  }
}
</script>
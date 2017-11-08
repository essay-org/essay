<template>
  <div>
    <my-header/>
    <div class="container wrap">
      <my-aside></my-aside>
      <nuxt/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'
import MyAside from '~/components/Aside.vue'
export default {
  components: {
    MyHeader,
    MyFooter,
    MyAside
  }
}
</script>

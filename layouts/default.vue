<template>
  <div>
    <my-header/>
    <div class="container wrap">
      <nuxt/>
      <my-footer/>
    </div>
  </div>
</template>
<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'
export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<template>
  <div class="layout">
    <Nav />
    <nuxt/>
    <Footer />
  </div>
</template>
<script>
import Nav from '../components/Nav.vue'
import Footer from '../components/Footer.vue'
export default {
  components: {
    Nav,
    Footer
  }
}
</script>
<style lang="postcss">
.layout {
  background-color: #fff;
  max-width: 800px;
  margin: 90px auto 30px;
}
</style>

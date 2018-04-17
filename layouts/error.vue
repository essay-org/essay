<template>
  <section class="error">
    <h1 class="error-title">
      {{ error.statusCode }}
    </h1>
    <h2 class="error-info">
      {{ error.message }}
    </h2>
    <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
      Homepage
    </nuxt-link>
  </section>
</template>
<script>
export default {
  props: ['error']
}
</script>
<style lang="scss" scoped>
.error {
  width: 700px;
  margin: 60px auto;
  text-align: center;
  .error-title {
    font-size: 5em;
    font-weight: 600;
  }
  .error-info {
    font-weight: lighter;
    color: #666;
    margin: 0;
  }
  .button {
    margin-top: 50px;
  }
}
</style>

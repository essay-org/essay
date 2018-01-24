<template>
  <section class="error">
    <h1 class="error-title">
      {{ error.statusCode }}
    </h1>
    <h2 class="error-info">
      {{ error.message }}
    </h2>
    <nuxt-link class="error-button" to="/">
      Homepage
    </nuxt-link>
  </section>
</template>
<script>
export default {
  props: ['error']
}
</script>

<style lang="postcss">
.error {
  text-align: center;
  & .error-title {
    font-size: 50px;
    font-weight: bold;
    margin-top: 70px;
  }
  & .error-info {
    color: #666;
    font-weight: normal;
  }
  & .error-button {
    margin: 25px;
  }
}
</style>

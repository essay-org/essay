<template>
  <section class="error">
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>
    <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
      返回首页
    </nuxt-link>
  </section>
</template>
<script>
export default {
  name: 'Error',
  props: ['error']
}
</script>

<style scoped>
.error {
  text-align: center;
  padding-top: 200px;
}
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>

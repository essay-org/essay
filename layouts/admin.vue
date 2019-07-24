<template>
  <div class="admin container">
    <blog-nav type="admin" />
    <nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '后台',
    }
  },
}
</script>

<style lang="scss" scoped>
.admin {
  padding: 15px;
}
</style>

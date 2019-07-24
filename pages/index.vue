<template>
  <div class="index">
    <blog-list />
  </div>
</template>

<script>
export default {
  async fetch({ store, route }) {
    const { page = 1, category = '', keywords = '' } = route.query
    await Promise.all([
      store.dispatch('getArticles', {
        category,
        keywords,
        page,
      }),
      store.dispatch('getArticlesTop'),
    ])
  },
}
</script>

<style lang="scss" scoped>
.index {
}
</style>

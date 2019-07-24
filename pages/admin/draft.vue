<template>
  <div class="admin-draft">
    <blog-list is-draft />
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'admin',
  mounted() {
    this.$store.dispatch('getDrafts', { page: 1 })
  }
}
</script>

<style lang="scss" scoped>
</style>

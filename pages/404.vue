<template>
  <div />
</template>

<script>
export default {
  layout: 'error',
  fetch({ error }) {
    error({ statusCode: 404 })
  }
}
</script>

<style lang="scss" scoped>
</style>

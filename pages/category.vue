<template>
  <div class="category">
    <div
      v-for="item in categories"
      :key="item.id"
      class="item"
    >
      <span v-if="!item.isShow">[私]</span>
      <nuxt-link :to="`/?category=${item.id}&page=1`">{{ item.title }} ({{ item.total }})</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState([
      'categories',
    ])
  }
}
</script>

<style lang="scss" scoped>
.category {
  .item {
    display: inline-block;
    margin-bottom: 20px;
    margin-right: 20px;
  }
}
</style>

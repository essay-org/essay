<template>
  <div class="tags container">
    <template v-if="$route.params.id">
      <top-list :articles="$store.state.tagArticles"/>
    </template>
    <template v-else>
      <ul class="tags-list">
        <li class="tag" v-for="(tag, index) in $store.state.tags" :key="index">
          <nuxt-link :to="'/tags/'+ tag.id">{{ tag.name }}</nuxt-link>
        </li>
      </ul>
    </template>
  </div>
</template>
<script>
export default {
  async fetch({ store, route }) {
    let id = route.params.id || ''
    await store.dispatch('TAGS', id)
  },
  head() {
    return {
      title: '标签 - ' + this.$store.state.user.nickname
    }
  }
}

</script>


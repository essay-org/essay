<template>
  <div class="tags">
    <template v-if="hasID">
      <list :articles="articles"></list>
    </template>
    <template v-else>
      <div class="tags-list">
        <p class="tag" v-for="(tag, index) in tags" :key="index">
          <nuxt-link :to="'/tags/'+ tag.id">{{ tag.name }}</nuxt-link>
        </p>
      </div>
    </template>
  </div>
</template>
<script>
import List from '~/components/List.vue'
export default {
  async asyncData({ store, route }) {
    let id = route.params.id || ''
    let data = await store.dispatch('TAGS', id)
    if (route.params.id) {
      // articles
       if (data.success) {
        return {
          hasID: true,
          articles: data.data,
          tags: []
        }
      }
    } else {
      // tags
      if (data.success) {
        return {
          hasID: false,
          tags: data.data,
          articles: []
        }
      }
    }
  },
  components: {
    List
  }
}

</script>

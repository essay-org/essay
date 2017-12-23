<template>
  <my-items :articleList="articleList"></my-items>
</template>
<script>
import MyItems from '~/components/Items.vue'
export default {
  name: 'Index',
  async fetch ({ store, params }) {
    // 填充状态树
    await store.dispatch('LIST_PAGE', {
      typeName: 'top',
      category: params.category,
      page: params.page
    })
  },
  computed: {
    articleList () {
      return this.$store.state.articleList
    }
  },
  components: {
    MyItems
  }
}
</script>

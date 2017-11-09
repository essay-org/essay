<template>
  <my-items :articleList="articleList" :routerName="routerName"></my-items>
</template>
<script>
import MyItems from '~/components/items.vue'
  export default {
    name: 'tags-category-page',
    async fetch({store,params}) {
      // 填充状态树
      await store.dispatch('LIST_PAGE', {
        typeName: 'tags',
        category: params.category, 
        page: params.page
      })
    },
    head() {
      return {
        title: `${this.$store.state.category} | 第${this.$store.state.page}页`
      }
    },
    computed: {
      articleList(){
        return this.$store.state.articleList
      },
      routerName(){
        return 'tags-category-page'
      }
    },
    components: {
      MyItems
    }
  }
</script>
<style scoped>

</style>

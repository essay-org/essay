<template>
  <my-items :articleList="articleList" :routerName="routerName"></my-items>
</template>
<script>
import MyItems from '~/components/items.vue'
  export default {
    name: 'archives-category',
    async fetch({store,params}) {
      // 填充状态树
      await store.dispatch('LIST_PAGE', {
        typeName: 'archives',
        category: params.category, 
        page: params.page
      })
    },

    computed: {
      articleList(){
        return this.$store.state.articleList
      },
      routerName(){
        return 'archives-category-page'
      }
    },
    components: {
      MyItems
    }
  }
</script>
<style scoped>

</style>

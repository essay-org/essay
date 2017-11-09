<template>
  <div class="white">
    <my-items :articleList="articleList" :routerName="routerName" :pageName="pageName"></my-items>
  </div>
</template>
<script>
import MyItems from '~/components/items.vue'
  export default {
    name: 'Index',
    async fetch({store,params}) {
      // 填充状态树
      await store.dispatch('LIST_PAGE', {
        typeName: 'index',
        category: params.category,
        page:params.page
      })
    },

    computed: {
      articleList(){
        return this.$store.state.articleList
      },
      routerName(){
        return 'index-page'
      },
      pageName(){
        return 'index'
      }
    },
    components: {
      MyItems
    }
  }
</script>
<style scoped>

</style>

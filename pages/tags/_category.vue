<template>
  <div class="white">
    <my-items :articleList="articleList" :routerName="routerName"></my-items>
  </div>
</template>
<script>
import MyItems from '~/components/items.vue'
  export default {
    name: 'tags-category',
    async fetch({store,params}) {
      // 填充状态树
      await store.dispatch('LIST_PAGE', {
        typeName: 'tags',
        category: params.category, 
        page: params.page
      })
    },

    computed: {
      articleList(){
        return this.$store.state.articleList
      },
      routerName(){
        return 'tags-category'
      }
    },
    components: {
      MyItems
    }
  }
</script>
<style scoped>

</style>

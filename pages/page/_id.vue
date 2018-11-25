<template>
  <div class="index">
    <blog-list :articles="articles" />
    <wmui-pagination 
    :limit="limit" 
    :total="total" 
    :currentPage="currentPage"
    @pageClick="pageClick"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  fetch({ store, route }) {
    return store.dispatch('ARTICLES', Number(route.params.id))
  },
  data() {
    return {
      currentPage: Number(this.$route.params.id) || 1
    }
  },
  head() {
    return {
      title: this.user.nickname
    }
  },
  computed: mapState([
    'user',
    'articles',
    'total',
    'limit',
  ]),
  methods: {
    pageClick(i) {
      this.$router.push({
        name: 'page-id',
        params: {
          id: i
        }
      })
    }
  }
}

</script>

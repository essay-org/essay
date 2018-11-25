<template>
  <div class="tags">
    <template v-if="$route.params.id">
      <blog-list :articles="tagArticles"/>
      <wmui-pagination 
        :limit="limit" 
        :total="total" 
        :currentPage="currentPage"
        @pageClick="pageClick"/>
    </template>
    <template v-else>
      <ul class="tags-list">
        <li class="tag" v-for="(tag, index) in tags" :key="index">
          <nuxt-link :to="'/tags/'+ tag.id">{{ tag.name }}</nuxt-link>
        </li>
      </ul>
    </template>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  fetch({ store, route }) {
    let id = route.params.id
    if(id){
      return store.dispatch('TAG_ARTICLES', {id, page: 1})
    }else{
      return store.dispatch('TAGS')
    }
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  head() {
    return {
      title: '标签 - ' + this.user.nickname
    }
  },
  computed: mapState([
    'user',
    'tags',
    'tagArticles',
    'limit',
    'total',
  ]),
  methods: {
    pageClick(i) {
      this.currentPage = i
      this.$store.dispatch('TAG_ARTICLES', {id: this.$route.params.id, page: Number(i)})
    }
  },
}

</script>


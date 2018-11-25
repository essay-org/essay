<template>
  <div class="archives">
    <div class="archive-item" v-for="(archive, index) in archives" :key="index">
      <h3 class="item-title">{{ archive.date }}({{ archive.total }})</h3>
      <ul class="item-list">
        <li v-for="(article, index) in archive.articles" :key="index">
          <span>{{ article.createdAt | formatDate('MM-dd')}}</span>
          <nuxt-link :to="'/detail/'+article.id" class="truncation">{{ article.title }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'archives',
  fetch({ store }) {
    if(!store.state.archives.length) {
      return store.dispatch('ARCHIVES')
    }
  },
  head() {
    return {
      title: '归档 - ' + this.user.nickname
    }
  },
  computed: mapState([
    'user',
    'archives',
  ]),
}

</script>

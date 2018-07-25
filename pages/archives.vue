<template>
  <div class="archives container">
    <div class="archive-item" v-for="(archive, index) in $store.state.archives" :key="index">
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
export default {
  async fetch({ store }) {
    if(!store.state.archives.length) {
      await store.dispatch('ARCHIVES')
    }
  },
  head() {
    return {
      title: '归档 - ' + this.$store.state.user.nickname
    }
  }
}

</script>

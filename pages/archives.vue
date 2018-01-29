<template>
  <div class="archives container">
    <div class="archive" v-for="(archive, index) in archives" :key="index">
      <p class="archive-date">{{ archive.date }}({{ archive.total }})</p>
      <ul>
        <li class="archive-title" v-for="(article, index) in archive.articles" :key="index">
          <nuxt-link :to="'/detail/'+article.id">{{ article.title }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ store }) {
    let data = await store.dispatch('ARCHIVES')
    if (data.success) {
      return {
        archives: data.data
      }
    } else {
      return {
        archives: []
      }
    }
  }
}

</script>

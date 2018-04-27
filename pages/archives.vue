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
export default {
  async asyncData({ store }) {
    const { data } = await store.dispatch('ARCHIVES')
    return {
      archives: data || []
    }
  },
  head() {
    return {
      title: '归档 - ' + this.$store.state.user.nickname
    }
  }
}

</script>
<style lang="scss" scoped>
@import '~/assets/css/var.scss';
.archives {
  max-width: 700px;
  margin: 60px auto;
  .archive-item {
    margin-bottom: 30px;
  }
  .item-title {
    font-size: 20px;
    font-weight: 400;
  }
  .item-list {
    li {
      display: flex;
      padding: 7px 0;
      color: #999;
      list-style-position: inside;
    }
    span {
      width: 80px;
    }
    a {
      display: block;
      flex: 1;
      color: $font-color;
      font-weight: lighter;
      &:hover {
        color: $link-color;
      }
    }
  }
}

</style>

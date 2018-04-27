<template>
  <div class="list">
    <ul class="list-article">
      <li class="article" v-for="(article, index) in articles" :key="article.id">
        <h2 class="article-title">
          <nuxt-link class="title-link" :to="'/detail/' + article.id">{{ article.title }}</nuxt-link>
        </h2>
        <p class="article-body">{{ article.content | cutString(170) }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'top-lists',
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  }
}

</script>
<style lang="scss">
$link-color: #42B983;
$font-color: #24292e;
.list {
  ul {
    list-style: none;
  }
  .article {
    max-width: 700px;
    margin: 60px auto;
    .article-title {
      font-size: 20px;
      font-weight: normal;
      a {
        color: $font-color;
        &:hover {
          color: $link-color;
        }
      }
    }
    .article-body {
      margin: 10px 0;
      color: #666;
    }
  }
}

</style>

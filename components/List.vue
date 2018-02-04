<template>
  <div class="list">
    <ul class="list-list">
      <li class="list-item" v-for="(article, index) in articles" :key="index">
        <p class="item-title">
          <span>[{{ article.flag | flag }}] </span>
          <a class="title-link" :href="article.link" target="_blank" v-if="article.flag == 2">{{ article.title }}</a>
          <nuxt-link class="title-link" :to="'/detail/' + article.id" v-else>{{ article.title }}</nuxt-link>
        </p>
        <div class="item-content">{{ article.content | cutString(180) }} <nuxt-link :to="'/detail/' + article.id">详情》</nuxt-link></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    articles: {
      type: Array,
      default: []
    }
  }
}

</script>
<style lang="postcss">
.list {
  & .list-list {
    & .list-item {
      border-top: 1px dashed #e4e4e4;
      list-style-type: none;
      & .item-title {
        padding: 15px;
        font-size: 17px;
        & a:hover {
          text-decoration: underline;
        }
      }
      & .item-content {
        padding: 0 15px 15px;
      }
      &:nth-child(1) {
        border-top: none;
      }
    }
  }
}

</style>

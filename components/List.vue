<template>
  <div class="list">
    <ul class="list-list">
      <li class="list-item" v-for="(article, index) in articles" :key="index">
        <p class="item-title">
          <nuxt-link class="title-link" :to="'/detail/' + article.id">{{ article.title }}</nuxt-link>
        <p class="item-content">{{ article.content | cutString(180) }}</p>
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

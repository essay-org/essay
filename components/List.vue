<template>
  <div class="list">
    <ul class="list-list">
      <li class="list-item" v-for="(article, index) in articles" :key="index">
        <p class="item-title"><nuxt-link :to="'/detail/' + article.id">{{ article.title }}</nuxt-link></p>
        <div class="item-content">{{ article.content }}</div>
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
      padding: 15px 0;
      & .item-title a {
        font-size: 17px;
      }
      &:nth-child(1) {
        padding-top: 0;
        border-top: none;
      }
    }
  }
}
</style>

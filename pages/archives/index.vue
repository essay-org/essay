<template>
  <div class="category-list">
    <div class="list">
      <ul>
        <li v-for="(item,index) in $store.state.archives" :key="index">
          <nuxt-link :to="{name:'archives-category-page',params:{category:item.date}}">{{item.date | formatArchive }} ({{item.count}})</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Archives',
  async fetch ({ store }) {
    await store.dispatch('ARCHIVES')
  }
}
</script>

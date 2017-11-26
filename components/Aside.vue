<template>
  <aside class="aside">
    <div class="tags">
      <div class="title">标签</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in tags" :key="index">
            <nuxt-link :to="{name:'tags-category-page',params:{category:item.tag}}">{{item.tag}} ({{item.count}})</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="archives">
      <div class="title">归档</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in archives" :key="index">
            <nuxt-link :to="{name:'archives-category-page',params:{category:item.date}}">{{item.date | formatArchive }} ({{item.count}})</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  name: 'Aside',

  computed: {
    tags () {
      return this.$store.state.tags
    },
    archives () {
      return this.$store.state.archives
    }
  }
}
</script>

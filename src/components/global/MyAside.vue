<template>
  <aside class="aside">
    <div class="tags">
      <div class="title">标签</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in tags" :key="index">
            <router-link :to="{name:'category',params:{change:item.tag}}">{{item.tag}} ({{item.count}})</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="archives">
      <div class="title">归档</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in archives" :key="index">
            <router-link :to="{name:'archive',params:{change:item.date}}">{{item.date | formatArchive }} ({{item.count}})</router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  name: 'MyAside',
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
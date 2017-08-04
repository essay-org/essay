<template>
  <aside class="aside">
    <div class="tags">
      <div class="title"><i class="iconfont icon-iconfontyouhuiquan"></i>标签</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in tags" :key="index">
            <a @click="articleByTag(item.tag)">{{item.tag}} ({{item.count}})</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="archives">
      <div class="title"><i class="iconfont icon-wodedangan"></i>归档</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in archives" :key="index">
            <a @click="articleByArchive(item.date)">{{item.date}} ({{item.count}})</a>
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
    tags() {
      return this.$store.state.tags
    },
    archives() {
      return this.$store.state.archives
    }
  },
  methods: {
    articleByTag(item) {
      this.$router.push({
        name: 'category',
        params: {
          change: item
        }
      })
    },
    articleByArchive(date) {
      var year = parseInt(date);
      var month =date.slice(5,-1); 
      if(month.length === 1) {
        month = '0'+month;
      }
      var date = year + month
      this.$router.push({
        name:'archive',
        params: {
          change:date
        }
      })
    }
  }
}
</script>

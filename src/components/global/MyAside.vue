<template>
  <aside class="aside">
    <div class="tags">
      <div class="title"><i class="iconfont icon-iconfontyouhuiquan"></i>标签</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in tags" :key="index">
            <a @click="byTag(item.tag)">{{item.tag}} ({{item.count}})</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="archives">
      <div class="title"><i class="iconfont icon-wodedangan"></i>归档</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in archives" :key="index">
            <a @click="byArchive(item.date)">{{item.date}} ({{item.count}})</a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  name: 'aside',
  computed: {
    tags() {
      return this.$store.state.tags
    },
    archives() {
      return this.$store.state.archives
    }
  },
  methods: {
    byTag(item) {
      this.$router.push({
        name: 'categoryTag',
        params: {
          tag: item
        }
      })
    },
    byArchive(date) {
      // 处理日期
      var year = parseInt(date);
      var month =date.slice(5,-1); 
      if(month.length === 1) {
        month = '0'+month;
      }
      var dateParam = year + month
      // console.log(dateParam)
      this.$router.push({
        name:'archiveDate',
        params: {
          date:dateParam
        }
      })
    }
  }
}
</script>

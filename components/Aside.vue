<template>
  <aside class="aside">
    <div class="tags">
      <div class="title">标签</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in tags" :key="index">
            <nuxt-link :to="{name:'tags-category',params:{category:item.tag}}">{{item.tag}} ({{item.count}})</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="archives">
      <div class="title">归档</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in archives" :key="index">
            <nuxt-link :to="{name:'archives-category',params:{category:item.date}}">{{item.date | formatArchive }} ({{item.count}})</nuxt-link>
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
<style lang="scss" scoped>
@import '~assets/css/var.scss';
.aside {
  width: 230px;
  background-color: #F8F8F8;
  padding: 15px;
  .tags,
  .archives {
    .icon-iconfontyouhuiquan,
    .icon-wodedangan,
    .title {
      font-size: 20px;
      font-style: bold;
      padding: 10px 0;
    }
    .title {
      border-bottom: 1px solid $Border; // padding-left: 10px;
    }
    .list {
      li+li {
        border-top: 1px dashed $Border;
      }
      a {
        padding: 15px 0;
        display: block;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
</style>
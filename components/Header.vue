<template>
  <header class="header">
    <div class="container info">
      <div class="nickname" @click="goIndex">{{ administrator.nickname }}</div>
      <div class="intro">{{ administrator.intro }}</div>
    </div>
    <nav class="container nav">
      <ul>
        <li v-for="(item,index) in links" :key="index">
          <nuxt-link :to="item.path">{{ item.name }}</nuxt-link>
        </li>
      </ul>
      <div class="search">
        <input type="search" name="search" placeholder="search" v-model="searchInfo" autofocus @keyup.enter="search">
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      links: [{
        name: '首页',
        path: '/top'
      }, {
        name: '标签',
        path: '/tags'
      }, {
        name: '归档',
        path: '/archives'
      }, {
        name: '新随笔',
        path: '/publish'
      }],
      searchInfo: ''
    }
  },
  computed: {
    administrator () {
      return this.$store.state.administrator
    }
  },
  methods: {
    search () {
      if (this.searchInfo === '') {
        this.$router.push('/search')
        return
      }
      this.$router.push({
        name: 'search-category-page',
        params: {
          category: this.searchInfo
        }
      })
    },
    goIndex () {
      this.$router.push('/top')
    }
  }
}
</script>

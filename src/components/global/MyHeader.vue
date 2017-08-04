<template>
  <header class="header">
    <div class="container info">
      <div class="nickname vueblog-font">{{ administrator.nickname }}</div>
      <div class="intro vueblog-font">{{ administrator.intro }}</div>
    </div>
    <nav class="container nav">
      <ul>
        <li v-for="(item,index) in links" :key="index">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
      </ul>
      <div class="search">
        <input type="search" name="search" placeholder="search" v-model="searchInfo" autofocus @keyup.enter="search">
      </div>
    </nav>
  </header>
</template>
<script>
import axios from 'axios'
export default {
  name: 'MyHeader',
  data() {
    return {
      links: [{
        name: '首页',
        path: '/'
      }, {
        name: '新随笔',
        path: '/publish',
      }, {
        name: '管理',
        path: '/admin'
      }],
      searchInfo: ''
    }
  },
  computed: {
    administrator() {
      return this.$store.state.administrator
    }
  },
  methods: {
    search() {
      this.$router.push({
        name: 'search',
        params: {
          change: this.searchInfo
        }
      })
    }
  }
}
</script>
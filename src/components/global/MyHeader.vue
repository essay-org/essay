<template>
  <header class="header">
    <div class="intro">
      <div class="myNickname">{{ administrator.nickname }}</div>
      <div class="myIntro">{{ administrator.intro }}</div>
    </div>
    <nav class="nav clearfix">
      <div class="logo">
        <div class="v"></div>
      </div>
      <ul>
        <li v-for="(item,index) in links" :key="index">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
      </ul>
      <div class="search">
        <input type="text" name="search" placeholder="search" v-model="searchInfo" autofocus @keyup.enter="search">
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
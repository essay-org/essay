<template>
  <header class="header">
    <div class="intro">
      <div class="myNickname">{{ intro.nickname }}</div>
      <div class="myIntro">{{ intro.intro }}</div>
    </div>
    <nav class="nav clearfix">
      <div class="logo">
        <div class="v"></div>
      </div>
      <ul>
         <li v-for="(item,index) in links" :key="index">
         <router-link :to="item.path">{{ item.name }}</router-link>
                </li>
        <!-- <li>
          <a @click="index">首页</a>
        </li>
        <li>
          <a @click="adminpublish">新随笔</a>
        </li>
        <li>
          <a @click="admin">管理</a>
        </li> -->
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
  name: 'header',
  data() {
    return {
      links: [{
        name: '首页',
        path: '/'
      }, {
        name: '新随笔',
        path: '/adminpublish',
      }, {
        name: '管理',
        path: '/admin'
      }],
      searchInfo: ''
    }
  },
  computed: {
    intro() {
      return this.$store.state.intro
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
    },
    /*index() {
      this.$router.push({
        name: 'index'
      })
    },
    adminpublish() {
      var instance = axios.create();
      instance.get('http://localhost:8080/adminpublish')
    },
    admin() {
      var instance = axios.create();
      instance.get('http://localhost:8080/admin')
    }*/
  }
}
</script>

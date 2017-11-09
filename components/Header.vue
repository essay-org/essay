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
        path: '/'
      }, {
        name: '新随笔',
        path: '/publish'
      }, {
        name: '管理',
        path: '/admin'
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
      this.$router.push({
        name: 'search',
        params: {
          change: this.searchInfo
        }
      })
    },
    goIndex () {
      this.$router.push({name: 'index-page'})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/css/var.scss';
.header {
  height: 240px;
  background-color: $BlackPrimary;
  .info {
    margin: 0 auto;
    color: #FFF;
    height: 184px;
    .nickname {
      font-size: 35px;
      font-weight: bold;
      padding: 50px 0 30px 18px;
      cursor: pointer;
    }
    .intro {
      font-size: 20px;
      padding: 0 0 30px 150px;
    }
  }
  .nav {
    display: flex;
    margin: 0 auto;
    background-color: $BlackSecondary;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #3D4045;
    border-bottom: none;
    ul {
      display: flex;
      a {
        padding: 19px 18px;
        color: #C8C9CA;
        &:hover {
          text-decoration: none;
        }
      }
    }
    input[type="search"] {
      width: 280px;
      margin-right: 18px;
      border: none;
      background-color: #404448;
      color: #C8C9CA;
    }
  }
}
</style>
<template>
  <aside class="admin-aside">
    <ul class="menu">
      <li>
        <h3 @click="goIndex">VueBlog</h3>
      </li>
      <li v-for="item in menu">
        <router-link :to="{path:item.path}" :title="item.name">{{item.name}}</router-link>
      </li>
      <li><a @click="logout">退出登录</a></li>
    </ul>
  </aside>
</template>
<script>
export default {
  name:'AdminAside',
  data() {
    return {
      menu: [{
        name: '后台首页',
        path: '/admin'
      }, {
        name: '发布文章',
        path: '/publish'
      }, {
        name: '修改信息',
        path: '/updateAdminInfo'
      }, {
        name: '修改密码',
        path: '/updateAdminPassword'
      }]
    }
  },
  methods: {
    logout() {
      this.axios.post('/logout').then((data) => {
        if (data.data.code === 200) {
          this.$router.push({ name: 'index' })
          this.$router.go(0)
        }
      })
    },
    goIndex() {
      this.$router.push({name:'index'})
    }
  }
}
</script>
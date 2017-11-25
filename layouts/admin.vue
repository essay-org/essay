<template>
  <div class="admin">  
    <aside class="admin-aside">
      <ul class="menu">
        <li>
          <h3 @click="goIndex">VueBlog</h3>
        </li>
        <li v-for="item in menu">
          <nuxt-link :to="{path:item.path}" :title="item.name">{{item.name}}</nuxt-link>
        </li>
        <li><a @click="logout">退出登录</a></li>
      </ul>
    </aside>
    <div class="admin-content">
      <nuxt/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdminAside',
  data () {
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
    async logout () {
      await this.$store.dispatch('LOGOUT')
    },
    goIndex () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
@import '~assets/css/var.scss';
.admin {
  position: relative;
  width: 100%;
  height: 100%;
  .admin-aside {
    width: 180px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    background-color: $BlackSecondary;
    h3 {
      color: #FFF;
      text-align: center;
      padding: 10px 0;
    }
    li {
      cursor: pointer;
      a {
        display: block;
        padding: 10px 20px;
        color: #FFF;
        text-decoration: none;
        &:hover {
          background-color: rgba(0, 0, 0, .1);
        }
        &.current {
          color: $Link;
          background-color: rgba(0, 0, 0, .1);
        }
      }
    }
  }
  .admin-content {
    position: relative;
    min-height: 100%;
    margin-left: 180px;
    background-color: #fff;
    .content {
      margin-bottom: 20px;
    }
  }
}
</style>
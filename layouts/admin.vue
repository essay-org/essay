<template>
  <div class="admin">
    <my-header/>
    <div class="container wrap">
      <div class="menu">
        <ul>
          <li v-for="(item, index) in menu" :key="index">
            <nuxt-link :to="{path:item.path}" :title="item.name">{{item.name}}</nuxt-link>
          </li>
          <li><a @click="logout">退出登录</a></li>
        </ul>
      </div>
      <nuxt />
      <my-footer/>
    </div>
  </div>
</template>
<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'
export default {
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
        path: '/update-info'
      }, {
        name: '修改密码',
        path: '/update-password'
      }]
    }
  },
  methods: {
    async logout () {
      // 该请求会删除cookie
      await this.$store.dispatch('LOGOUT')
      if (this.$store.state.status.code === 200) {
        // 退出成功, 跳转
        this.$router.push('/top')
        // 清除token
        this.$store.commit('SET_USER', '')
      } else {
        console.log(this.$store.state.status.message)
      }
    },
    goIndex () {
      this.$router.push('/top')
    }
  },
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
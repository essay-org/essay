<template>
  <div class="login container">
    <input type="text" class="login-username" placeholder="用户名" autocomplete="off" v-model="user.username">
    <input type="password" class="login-password" placeholder="密码" autocomplete="off" v-model="user.password">
    <button class="login-button" @click="login">登 录</button>
    <Tip ref="tip"></Tip>
  </div>
</template>
<script>
import Tip from '~/components/Tip.vue'
  export default {
    data() {
      return {
        user:{}
      }
    },
    components: {
      Tip
    },
    methods: {
      login () {
        if(!this.user.username || !this.user.password) {
          return
        }
        this.$store.dispatch('LOGIN', this.user).then(data => {
          if(data.success) {
            this.$router.push('/admin/publish')
          } else {
            this.$refs.tip.openTip('用户名或密码不正确')
          }
        })
      }
    }
  }
</script>

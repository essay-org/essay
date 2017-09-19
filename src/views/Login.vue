<template>
  <div class="login">
    <h4 class="title">管理员登录</h4>
    <div class="form">
      <input type="text" placeholder="请输入用户名" name="user" v-model="user">
      <input type="password" placeholder="请输入密码" name="pass" v-model="pass" @keyup.enter="login">
      <button type="button" @click="login">登录</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      pass: ''
    }
  },
  methods: {
    login () {
      this.axios.post('/login', {
        'user': this.user,
        'pass': this.pass
      }).then((result) => {
        if (result.data.code === 200) {
          this.$router.push({
            name: 'publish'
          })
        } else {
          this.$msg.showMsg(result.data.message)
        }
      })
    }
  }
}
</script>
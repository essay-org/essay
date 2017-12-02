<template>
  <div class="login">
    <h4 class="title">管理员登录</h4>
    <div class="form">
      <input type="text" placeholder="请输入用户名" name="username" v-model="username">
      <input type="password" placeholder="请输入密码" name="password" v-model="password" @keyup.enter="login">
      <p class="login-tip">{{ loginTip }}</p>
      <button type="button" @click="login">登录</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loginTip:''
    };
  },
  methods: {
    async login() {
      if(this.username === '' || this.password === '') {
        this.loginTip = '请正确填写用户名和密码'
        return
      }
      await this.$store.dispatch('LOGIN', {
        username: this.username,
        password: this.password
      });
      if (this.$store.state.status.code === 200) {
        // 登录成功, 存储token
        this.$store.commit('SET_USER', this.$store.state.status.token)
        this.$router.push('/publish')
        this.username = ''
        this.password = ''
      }
       this.loginTip = this.$store.state.status.message
    }
  }
}
</script>

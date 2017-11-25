<template>
  <div class="login">
    <h4 class="title">管理员登录</h4>
    <div class="form">
      <input type="text" placeholder="请输入用户名" name="username" v-model="username">
      <input type="password" placeholder="请输入密码" name="password" v-model="password" @keyup.enter="login">
      <button type="button" @click="login">登录</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
       await this.$store.dispatch('LOGIN', {
          username: this.username,
          password: this.password
        })
        this.username = ''
        this.password = ''
        // 登录成功
        if(this.$store.state.authUser) {
          this.$router.push('/publish')
        }
      } catch (e) {
        // 登录失败后返回错误信息
        console.log(e.message)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/css/var.scss';
  .login {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $BlackPrimary;
  .title {
    text-align: center;
    font-size: 30px;
    color: #fff;
    letter-spacing: 8px;
    margin-top: 100px;
  }
  .form {
    position: relative;
    background-color: #fff;
    width: 400px;
    margin: 50px auto;
    border-radius: 5px;
    padding: 40px 0;
    input[type="text"],
    input[type="password"],
    button[type="button"] {
      display: block;
      width: 80%;
      margin: 0 auto 20px;
    }
    button[type="button"] {
      color: #fff;
      background-color: $BlackSecondary;
      &:hover {
        cursor: pointer !important;
        background-color: $BlackPrimary;
      }
    }
  }
}
</style>
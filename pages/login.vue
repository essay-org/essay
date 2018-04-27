<template>
  <div class="login">
    <input type="text" placeholder="用户名" autocomplete="off" v-model="user.username">
    <input type="password" placeholder="密码" autocomplete="off" v-model="user.password" @keyup.enter="login">
    <button @click="login">登 录</button>
    <top-tip ref="tip"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user:{}
    }
  },
  head() {
    return {
      title: '登录 - ' + this.$store.state.user.nickname
    }
  },
  methods: {
    login() {
      if(!this.user.username || !this.user.password) {
        return false
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

<style lang="scss" scoped>
@import '~/assets/css/var.scss';
.login {
  max-width: 700px;
  margin: 60px auto;
  input {
    display: block;
    width: 300px;
    margin: 0 auto 30px auto;
  }
  button {
    display: block;
    width: 300px;
    border: none;
    line-height: 40px;
    font-size: 16px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    background-color: $font-color;
    color: #fff;
    border-radius: 3px;
    &:hover {
      background-color: darken($font-color, 5%);
    }
  }
}
</style>

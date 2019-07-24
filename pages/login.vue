<template>
  <div class="login">
    <input
      v-model="tmp.username"
      type="text"
      placeholder="用户名"
    >
    <input
      v-model="tmp.password"
      type="password"
      placeholder="密码"
    >
    <input
      v-model="tmp.code"
      type="text"
      placeholder="验证码"
      @keyup.enter="login"
    >
    <div class="code">
      <img
        :src="codeSrc"
        alt="code"
        @click="handleCode"
      >
    </div>
    <button
      class="primary"
      @click="login"
    >登录</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  layout: 'base',
  data() {
    return {
      tmp: {},
      codeSrc: '/api/code',
    }
  },
  computed: {
    ...mapState([
      'token',
    ])
  },
  mounted() {
    if (this.token) {
      this.$router.replace('/admin/posts')
    }
  },
  methods: {
    handleCode() {
      this.codeSrc = `/api/code?v=${Date.now()}`
    },
    async login() {
      if (!this.tmp.username || !this.tmp.password || !this.tmp.code) return

      await this.$store.dispatch('login', this.tmp)
      if (!this.token) return this.handleCode()

      this.$router.replace('/admin/posts')
    }
  },
}
</script>

<style lang="scss" scoped>
.login {
  input,
  .code {
    width: 300px;
    margin-bottom: 20px;
  }
}
</style>

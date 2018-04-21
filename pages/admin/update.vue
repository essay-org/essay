<template>
  <div class="admin-update">
    <div class="update-info">
      <h4>修改个人信息</h4>
      <input type="text" v-model="user.nickname">
      <input type="text" v-model="user.motto">
      <input type="text" v-model="user.email">
      <button @click="updateInfo">确认修改</button>
    </div>
    <div class="update-password">
      <h4>修改密码</h4>
      <input type="password" v-model="oldPassword" placeholder="输入旧密码">
      <input type="password" v-model="newPassword" placeholder="输入新密码">
      <input type="password" v-model="vertifyPassword" placeholder="再次输入新密码">
      <button @click="updatePassword">确认修改</button>
    </div>
    <top-tip ref="tip"/>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  async asyncData({ store }) {
    let data = await store.dispatch('ADMIN_INFO')
    if (data.success) {
      return {
        user: data.data
      }
    } else {
      return {
        user: {}
      }
    }
  },

  data() {
    return {
      oldPassword: '',
      newPassword: '',
      vertifyPassword: ''
    }
  },

  methods: {
    updateInfo() {
      this.$store.dispatch('UPDATE_ADMIN', this.user).then((data) => {
        if(data.success) {
          this.$refs.tip.openTip('信息修改完成')
        }
      })
    },
    updatePassword() {
      if (!this.oldPassword || !this.newPassword || !this.vertifyPassword) {
        return
      }
      if (this.newPassword !== this.vertifyPassword) {
        this.$refs.tip.openTip('两次密码不一致！')
        return
      }
      this.$store.dispatch('UPDATE_ADMIN', { oldPassword: this.oldPassword, newPassword: this.newPassword }).then((data) => {
        if(data.success) {
          this.$refs.tip.openTip('密码重置完成')
          // clear token
          this.$store.dispatch('LOGOUT').then(ret => {
            if(ret.success) {
              this.$store.state.token = ''
              this.$router.push('/')
            }
          })
        }
      })
    }
  }
}

</script>


<style lang="scss" scoped>
@import '~/assets/css/var.scss';
.admin-update {
  max-width: 960px;
  margin: 60px auto;
  text-align: center;
  .update-info {
    margin-bottom: 30px;
  }
  input {
    display: block;
    width: 300px;
    margin: 20px auto;
  }
  button {
    border: none;
    line-height: 40px;
    width: 300px;
    background-color: $font-color;
    color: #fff;
    border-radius: 3px;
    font-size: 16px;
    &:hover {
      background-color: darken($font-color, 5%);
    }
  }
}
</style>

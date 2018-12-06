<template>
  <div class="admin-update">
    <div class="update-info">
      <h4>修改个人信息</h4>
      <input type="text" v-model="user.nickname" placeholder="昵称">
      <input type="text" v-model="user.motto" placeholder="一句话介绍">
      <input type="text" v-model="user.email" placeholder="邮箱">
      <wmui-button className="wmui-btn-primary" @click.native="updateInfo">确认修改</wmui-button>
    </div>
    <div class="update-password">
      <h4>修改密码</h4>
      <input type="password" v-model="oldPassword" placeholder="输入旧密码">
      <input type="password" v-model="newPassword" placeholder="输入新密码">
      <input type="password" v-model="vertifyPassword" placeholder="再次输入新密码">
      <wmui-button className="wmui-btn-primary" @click.native="updatePassword">确认修改</wmui-button>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  middleware: 'auth',
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      vertifyPassword: '',
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  head() {
    return {
      title: '修改信息 - ' + this.user.nickname
    }
  },
  methods: {
    updateInfo() {
      this.$store.dispatch('UPDATE_ADMIN_INFO', this.user).then((data) => {
        if(data.success) {
          this.$Toast({text: '信息已修改'})
        }
      })
    },
    updatePassword() {
      if (!this.oldPassword || !this.newPassword || !this.vertifyPassword) {
        return false
      }
      if (this.newPassword !== this.vertifyPassword) {
        this.$Toast({text: '两次密码不一致'})
        return false
      }
      this.$store.dispatch('UPDATE_ADMIN_PASSWORD', { oldPassword: this.oldPassword, newPassword: this.newPassword }).then((data) => {
        if(data.success) {
          this.$Toast({text: '密码已重置'})
          // clear token
          this.$store.dispatch('LOGOUT').then(data => {
            if(data.success) {
              this.$router.push('/login')
            }
          })
        }
      })
    }
  }
}

</script>

<template>
  <div class="edit">
    <div class="my-input">
      <input type="text" v-model="oldPass" placeholder="请输入旧密码">
    </div>
    <div class="my-input">
      <input type="password" v-model="newPass" placeholder="请输入新密码">
    </div>
    <div class="my-input">
      <input type="password" v-model="verifyPass" placeholder="再次输入新密码">
    </div>
    <p>{{ verifyResult }}</p>
    <button type="button" @click="updatePassword">确认修改</button>
  </div>
</template>
<script>
  
export default {
  name: 'update-password',
  middware: 'auth',
  layout: 'admin',
  data () {
    return {
      oldPass: '',
      newPass: '',
      verifyPass: '',
      verifyResult: ''
    }
  },
  methods: {
    // 修改密码
    async updatePassword () {
      if (this.newPass !== this.verifyPass) {
        this.verifyResult = '密码不一致，请重新输入'
        return
      }
      let password = {
        oldPass: this.oldPass,
        newPass: this.newPass
      }
     await this.$store.dispatch('UPDATE_PASSWORD', password)
     if (this.$store.state.status.code === 200) {
       //  清除token
       await this.$store.dispatch('LOGOUT')
       this.$store.commit('SET_USER', '')
       this.verifyResult = this.$store.state.status.message
     }
    }
  }
}
</script>
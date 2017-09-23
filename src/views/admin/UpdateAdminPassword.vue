<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="edit">
        <div class="my-input">
          <input type="text" v-model="oldPass" placeholder="请输入旧密码">
        </div>
        <div class="my-input">
          <input type="password" v-model="pass" placeholder="请输入新密码">
        </div>
        <div class="my-input">
          <input type="password" v-model="verifyPass" placeholder="再次输入新密码">
        </div>
        <button type="button" @click="updateAdminPassword">确认修改</button>
      </div>
    </div>
  </div>
</template>
<script>
import AdminAside from '../../components/admin/AdminAside.vue'
export default {
  name: 'UpdateAdminPassword',
  data () {
    return {
      oldPass: '',
      pass: '',
      verifyPass: ''
    }
  },
  methods: {
    // 修改密码
    updateAdminPassword () {
      if (this.pass !== this.verifyPass) {
        this.$toast('两次密码不一致')
        return
      }
      this.axios.put('/password', {
        oldPass: this.oldPass,
        pass: this.pass
      }).then((result) => {
        if (result.data.code === 200) {
          this.$router.push({ name: 'login' })
        } else {
          this.$toast(result.data.message)
        }
      })
    }
  },
  components: {
    AdminAside
  }
}
</script>
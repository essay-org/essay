<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="edit">
        <div class="avatar">
          <div class="img">
            <img :src="avatar" @click="setAvatar">
            <span>更改</span>
          </div>
          <input type="file" name="avatar" accept="image/gif,image/jpeg,image/jpg,image/png" style="display:none" @change="changeImage($event)" ref="avatarInput">
        </div>
        <div class="my-input">
          <label for="nickname">昵称：</label>
          <input type="text" v-model="nickname" id="nickname">
        </div>
        <div class="my-input">
          <label for="intro">简介：</label>
          <input type="text" v-model="intro" id="intro">
        </div>
        <button type="button" @click="edit">确认修改</button>
      </div>
    </div>
  </div>
</template>
<script>
import AdminAside from '../../components/admin/AdminAside.vue'
export default {
  name: 'UpdateAdminInfo',
  title () {
    return '管理后台|vueblog'
  },
  data () {
    return {
      user: this.$store.state.administrator.user,
      avatar: this.$store.state.administrator.avatar + '?' + Math.random(),
      intro: this.$store.state.administrator.intro,
      nickname: this.$store.state.administrator.nickname,
      newAvatar: ''
    }
  },
  components: {
    AdminAside
  },
  methods: {
    // 修改了管理员信息
    edit () {
      this.axios.put('/administrator', {
        old: {
          user: this.user
        },
        new: {
          intro: this.intro,
          nickname: this.nickname
        }
      }).then((result) => {
        // 修改了头像
        if (this.$refs.avatarInput.files.length !== 0) {
          let image = new FormData()
          image.append('avatar', this.$refs.avatarInput.files[0])
          this.axios.post('/avatar', image, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        } else {
          this.$msg.showMsg(result.data.message)
        }
      })
    },

    // 模拟触发click事件
    setAvatar () {
      this.$refs.avatarInput.click()
    },

    // 选择新的头像后，可以预览
    changeImage (e) {
      let file = e.target.files[0]
      let reader = new FileReader()
      let that = this
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        that.avatar = this.result
      }
    }
  },
  asyncData ({
    store,
    route
  }) {
    return store.dispatch('ADMINISTRATOR')
  }
}
</script>
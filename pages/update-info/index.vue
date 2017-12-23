<template>
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
</template>
<script>
export default {
  name: 'update-info',
  middware: 'auth',
  layout: 'admin',
  data () {
    return {
      user: '',
      avatar: '',
      intro: '',
      nickname: ''
    }
  },
  async mounted () {
    await this.$store.dispatch('ADMIN_INFO')
    let admin = this.$store.state.administrator
    this.user = admin.user
    this.avatar = admin.avatar + '?' + Math.random()
    this.intro = admin.intro
    this.nickname = admin.nickname
  },
  methods: {
    async edit () {
      let info = {
        intro: this.intro,
        nickname: this.nickname
      }
      await this.$store.dispatch('ADMIN', info)
      // 修改了头像
      if (this.$refs.avatarInput.files.length !== 0) {
        let image = new FormData()
        image.append('avatar', this.$refs.avatarInput.files[0])
        await this.$store.dispatch('SET_AVATAR', image)
      }
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
  }
}
</script>
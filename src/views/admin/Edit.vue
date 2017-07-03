<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="content">
      <div class="edit">
        <div class="avatar">
          <!-- 后期改为使用ajax提交 -->
          <form action="/api/setavatar" method="post" enctype="multipart/form-data" ref="avatarForm">
            <div class="img"> 
            <img :src="avatar" @click="setAvatar">
            </div>
            <input type="file" name="avatar" accept="image/gif,image/jpeg,image/jpg,image/png" style="display:none" @change="changeImage($event)" ref="avatarInput">
          </form>
        </div>
        <div class="nickname">
          <label for="nickname">昵称：</label>
          <input type="text" v-model="nickname" id="nickname">
        </div>
        <div class="intro">
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
  title() {
      return '管理后台|vueblog'
    },
    data() {
      return {
        user: this.$store.state.intro.user,
        avatar: this.$store.state.intro.avatar,
        intro: this.$store.state.intro.intro,
        nickname: this.$store.state.intro.nickname,
        newAvatar: ''
      }
    },
    components: {
      AdminAside
    },
    methods: {
      edit() {
        this.axios.post('/updateadmin', {
          old: {
            user: this.user
          },
          new: {
            intro: this.intro,
            nickname: this.nickname
          }

        }).then((result) => {
          if(this.$refs.avatarInput.files.length !== 0){
          this.$refs.avatarForm.submit()
          }

          /*var image = new FormData()
          image.append('avatar', this.$refs.avatarInput.files[0] || this.avatar)
          this.axios.post('/setavatar', {
            newAvatar: image,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })*/
        })
      },
      setAvatar() {
        this.$refs.avatarInput.click()
      },
      changeImage(e) {
        var file = e.target.files[0]
        var reader = new FileReader()
        var that = this
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          that.avatar = this.result
        }
      }
    },
    asyncData({
      store,
      route
    }) {
      return store.dispatch('GETINTRO')
    }
}
</script>

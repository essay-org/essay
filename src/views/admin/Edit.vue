<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="content">
      <div class="edit">
        <div class="avatar">
          <img src="../../../public/avatar.jpg" height="239" width="239" alt="">
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
        nickname: this.$store.state.intro.nickname
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
            avatar: this.avatar,
            intro: this.intro,
            nickname: this.nickname
          }
        })
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

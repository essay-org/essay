<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="content">
      <div class="edit">
        <div class="nickname">
          <label for="user">新用户名：</label>
          <input type="text" v-model="user" id="user">
        </div>
        <div class="intro">
          <label for="intro">新密码：</label>
          <input type="password" v-model="pass" id="pass">
        </div>
        <div class="intro">
          <label for="pass">新密码：</label>
          <input type="password" v-model="pass" id="pass">
        </div>
        <div class="intro">
          <label for="verifyPass">确认新密码：</label>
          <input type="password" v-model="verifyPass" id="verifyPass">
        </div>
        <button type="button" @click="updateInfo">确认修改</button>
      </div>
    </div>
  </div>
</template>
<script>
import AdminAside from '../../components/admin/AdminAside.vue'
  export default {
    data(){
      return {
        user:'',
        pass:'',
        verifyPass:''
      }
    },
    methods:{
      updateInfo(){
        console.log(1)
      }
    },
    components:{
      AdminAside
    },
    asyncData(){
      return new Promise()
    }
  }
</script>
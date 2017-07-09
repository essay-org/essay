<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="content">
      <div class="edit">
        <div class="my-input">
          <input type="text" v-model="user" placeholder="请输入新用户名">
        </div>
        <div class="my-input">
          <input type="password" v-model="pass" placeholder="请输入新密码">
        </div>
        <div class="my-input">
          <input type="password" v-model="verifyPass" placeholder="再次输入新密码">
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
        if(this.pass !== this.verifyPass){
          console.log('密码不一致');
          return
        }
        this.axios.post('/updateinfo',{
          user:this.user,
          pass:this.pass
        },(data) => {
          console.log(data.data)
        })
      }
    },
    components:{
      AdminAside
    }
  }
</script>
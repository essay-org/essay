<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="content">
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
        oldPass:'',
        pass:'',
        verifyPass:''
      }
    },
    methods:{
      updateInfo(){
        if(this.pass !== this.verifyPass){
          alert('两次密码不一致')
          return
        }
        this.axios.post('/updateinfo',{

          oldPass:this.oldPass,
          pass:this.pass
        }).then((data) => {
          if(data.data.code === 200){
            this.$router.push({name:'login'})
          }else{
            alert(data.data.message)
          }
        })
      }
    },
    components:{
      AdminAside
    }
  }
</script>
<template>
  <aside class="left">
    <ul class="menu">
      <li>
        <h3>VueBlog</h3></li>
        <li v-for="item in menu"><router-link :to="{path:item.path}">{{item.name}}</router-link></li >
    </ul>
  </aside>
</template>
<script>
    export default {
        data() {
            return {
                menu:[{
                    name:'网站首页',
                    path:'/index'
                },{
                    name:'后台首页',
                    path:'/admin'
                },{
                    name:'发布文章',
                    path:'/adminpublish'
                },{
                    name:'编辑个人信息',
                    path:'/adminedit'
                }]
            }
        }
    }
</script>
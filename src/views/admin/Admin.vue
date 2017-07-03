<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="content">
      <div class="article">
        <table>
          <thead>
            <tr>
              <th>标题</th>
              <th>日期</th>
              <th>状态</th>
              <th>操作</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in data">
              <td><router-link :to="{name:'article',params:{id:item.date}}">{{item.title}}</router-link></td>
              <td>{{item.date | formatDate('yyyy-MM-dd')}}</td>
              <td :class="{'draft':item.state === 'draft'}">{{item.state | status}}</td>
              <td><a @click="edit(item)">编辑</a></td>
              <td><a @click="del(item)">删除</a></td>
            </tr>
          </tbody>
        </table>
        <div class="page" v-show="maxPage > 1">
          <router-link v-if="page > 1" :to="{name:'admin',params:{page:page - 1}}" class="prev">《上一页</router-link>
          <a v-else class="disabled prev">《上一页</a>
          <router-link v-if="hasMore" :to="{name:'admin',params:{page:page + 1}}" class="next">下一页》</router-link>
          <a v-else class="disabled next">下一页》</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminAside from '../../components/admin/AdminAside.vue'
export default {
  title(){
    return '管理后台|vueblog'
  },
  components: {
    AdminAside
  },

  beforeMount() {
    if (this.$root._isMounted) {
      this.allarticle()
    }

  },
  computed: {
    data() {
      return this.$store.state.allArticle.result;
    },
    number() {
      return this.$store.state.allArticle.number;
    },
    maxPage() {
      return Math.ceil(Number(this.number) / 15)
    },
    page() {
      return Number(this.$route.params.page) || 1
    },
    hasMore() {
      return this.page < this.maxPage;
    }
  },
  watch: {
    $route(to, from) {
      this.allarticle()
    }
  },
  methods:{
  	allarticle(){
  		this.$store.dispatch('ALLARTICLE')
  	},
  	del(item){
  		var id = item.date;
  		this.axios.post(`/delete?id=${id}`).then((data) => {
  			this.allarticle()
  		})
  	},
    edit(item) {
      this.$router.push({name:'adminpublish',params:{id:item.date}})
    }
  }
}
</script>

<template>
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
        <tr v-for="(item,index) in articles" :key="index">
          <td>
            <nuxt-link :to="{name:'article-id', params:{id:item.date}}">{{ item.title }}</nuxt-link>
          </td>
          <td>{{item.date | formatDate('yyyy-MM-dd')}}</td>
          <td :class="{'draft':item.state === 'draft'}">{{item.state | status}}</td>
          <td><a @click="edit(item)">编辑</a></td>
          <td><a @click="del(item)">删除</a></td>
        </tr>
      </tbody>
    </table>
    <div class="page" v-show="maxPage > 1">
      <a v-if="page > 1" class="prev" @click="prevPage">《上一页</a>
      <a v-else class="disabled prev">《上一页</a>
      <a v-if="hasMore" class="next" @click="nextPage">下一页》</a>
      <a v-else class="disabled next">下一页》</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Admin',
    middleware: 'auth',
    layout: 'admin',
    fetch ({redirect, store}) {
      if (!store.state.token) {
        redirect('/login')
      }
    },
    async mounted () {
      // 后台无需做ssr, 所以在mounted获取数据
      await this.$store.dispatch('LIST_BY_ALL', this.page)
    },
    computed: {
      articles () {
        return this.$store.state.articles
      },
      maxPage () {
        return Math.ceil(Number(this.$store.state.total) / 15)
      },
      page () {
        return Number(this.$route.params.page) || 1
      },
      hasMore () {
        return this.page < this.maxPage
      }
    },
    methods: {
      edit (item) {
        this.$router.push({name: 'publish-id', params: {id: item.date}})
      },
      async del (item) {
        await this.$store.dispatch('DEL_ARTICLE', item.date)
        await this.$store.dispatch('LIST_BY_ALL', this.page)
      },
      prevPage () {
        this.$router.push({
          params: {
            page: this.page - 1
          }
        })
      },
      nextPage () {
        this.$router.push({
          params: {
            page: this.page + 1
          }
        })
      }
    }
  }
</script>

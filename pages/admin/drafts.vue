<template>
  <div class="admin-draft">
    <!-- <div class="draft-null" v-if="articles.length === 0">空空如也</div>
    <ul class="draft-list" v-else>
      <li class="list-item" v-for="(article, index) in articles" :key="index">
        <p class="item-title truncation">
          <nuxt-link :to="'/detail/'+article.id" class="item-title">
            {{article.title}}
          </nuxt-link>
        </p>
        <p class="item-date">{{article.updatedAt | formatDate('yyyy-MM-dd')}}</p>
        <p class="item-del"><a @click="del(article.id)">删除</a></p>
        <p class="item-edit"><a @click="edit(article.id)">编辑</a></p>
      </li>
    </ul> -->
    <blog-list :articles="drafts" />
    <wmui-pagination 
    :limit="limit" 
    :total="total" 
    :currentPage="currentPage"
    @pageClick="pageClick"/>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  middleware: 'auth',
  fetch({store, route}) {
    return store.dispatch('DRAFTS', 1)
  },
  data() {
    return {
      articles: [],
      currentPage: 1
    }
  },
  mounted() {
    this.$store.dispatch('DRAFTS').then((data) => {
      this.articles = data.data
    })
  },

  head() {
    return {
      title: '草稿箱 - ' + this.user.nickname
    }
  },
  computed: {
    ...mapState([
      'user',
      'limit',
      'total',
      'drafts',
    ])
  },
  methods: {
    del(id) {
      let _self = this
      this.$Modal.confirm({
        title: '确定要删除这篇草稿吗？',
        text: '删除后不可恢复',
        onConfirm(instance) {
          _self.$store.dispatch('DELETE_ARTICLE', id).then((data) => {
            if(data.success) {
              _self.$Toast({text: '草稿已删除'})
              _self.$store.dispatch('DRAFTS').then((data) => {
                _self.articles = data.data
              })
            }
          })
          instance.open = false
        },
        onCancel(instance) {
          instance.open = false
        }
      })
    },
    edit(id) {
      this.$router.push(`/admin/posts/${id}`)
    },
    pageClick(i) {
      this.currentPage = i
      this.$store.dispatch('DRAFTS', i)
    }
  }
}

</script>


<template>
  <div class="admin-comments">
    <div class="mask" v-if="isShow"><span class="close" @click="isShow = false">&times;</span></div>
    <div class="comments-box" v-show="isShow">
      <p>{{ comment.content }}</p>
      <nuxt-link :to="(comment.article && comment.article.id) ? `/detail/${comment.article.id}` : ''" target="_blank">查看文章详情</nuxt-link>
    </div>
    <ul class="comments-list">
      <li class="list-item" v-for="(comment, index) in comments" :key="index">
        <a class="item-title" @click="showComment(comment)">{{comment.content}}</a>
        <p class="item-date">{{comment.createdAt | formatDate('yyyy-MM-dd')}}</p>
        <p class="item-del"><a @click="delBtn(comment)">删除</a></p>
      </li>
    </ul>
    <top-tip ref="tip"/>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      comment:{},
      comments: [],
      isShow: false,
      replyContent: ''
    }
  },
  mounted() {
    this.$store.dispatch('COMMENTS').then((data) => {
      this.comments = data.data
    })
  },
  head() {
    return {
      title: '评论列表 - ' + this.$store.state.user.nickname
    }
  },
  methods: {
    delBtn(comment) {
       this.$store.dispatch('DELETE_COMMENT', comment.id).then((data) => {
        if(data.success) {
         this.$refs.tip.openTip('评论已删除')
         this.$store.dispatch('COMMENTS').then((data) => {
           this.comments = data.data
         })
        }
      })
    },
    showComment(comment) {
      this.comment = comment
      this.isShow = true
    }
  }
}

</script>

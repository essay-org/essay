<template>
  <div class="admin-comments">
    <template v-if="comments.length === 0">
      <div class="comment-null">空空如也</div>
    </template>
    <template v-else>
      <wmui-dialog v-model="isShow">
        <h4>评论详情</h4>
        <p>{{ comment.content }}</p>
        <nuxt-link :to="(comment.article && comment.article.id) ? `/detail/${comment.article.id}` : ''" target="_blank">查看文章详情</nuxt-link>
      </wmui-dialog>
      <ul class="comments-list">
        <li class="list-item" v-for="(comment, index) in comments" :key="index">
          <a class="item-title" @click="showComment(comment)">{{comment.content}}</a>
          <p class="item-date">{{comment.created_at | formatDate('yyyy-MM-dd')}}</p>
          <p class="item-del"><a @click="delBtn(comment)">删除</a></p>
        </li>
      </ul>
    </template>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      comment: {},
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
      let _self = this
      this.$Modal.confirm({
        title: '确定要删除这条评论吗？',
        text: '删除后不可恢复',
        onConfirm(instance) {
          _self.$store.dispatch('DELETE_COMMENT', comment.id).then((data) => {
            if (data.success) {
              _self.$Toast({ text: '评论已删除' })
              _self.$store.dispatch('COMMENTS').then((data) => {
                _self.comments = data.data
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
    showComment(comment) {
      this.comment = comment
      this.isShow = true
    }
  }
}

</script>

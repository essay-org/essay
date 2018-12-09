<template>
  <div class="blog-comment">
    <div class="comment-list">
      <ul>
        <li v-for="item in realComments" :key="item.id">
          <div class="list-header clearfix">
            <a :href="`https://github.com/${item.user.username}`" class="header-avatar" target="_blank">
              <img :src="item.user.avatar" :alt="item.user.username" width="30px" height="30px">
            </a>
            <div class="header-reply" >
              <span>{{ item.user.username }}</span><span v-if="item.reply_id">回复{{item.reply_id.user.username}}</span>
            </div>
            <span class="header-time">{{item.created_at | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
          </div>
          <div class="list-content">
            <p>{{item.content}}</p>
          </div>
          <div class="list-handler">
            <a class="handler-reply" @click="replyComment(item.user.username, item.id)">回复</a>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="localToken" class="comment-login clearfix">
      <div class="comment-box">
        <img :src="userInfo.avatar" :alt="userInfo.name" width="50px" height="50px">
        <textarea v-model="commentContent" :placeholder="placeholder" class="box-content" maxlength="300" ref="commentTextarea"></textarea>
      </div>
      <wmui-button className="wmui-btn-primary" @click.native="submitComment" :disabled="disabled">提交留言</wmui-button>
    </div>
    <div v-else class="comment-unlogin">
      <wmui-button className="wmui-btn-primary" @click.native="githubLogin">Github 登录</wmui-button>
      <p>欢迎留言交流</p>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'blog-comment',
  props: {
    commentList: {
      type: Array,
      default: () => []
    },
    articleId: {
      type: String
    }
  },
  data() {
    return {
      disabled: false,
      commentContent: '',
      userInfo: {},
      comments: this.commentList,
      replyId: '',
      placeholder: ''
    }
  },
  computed: {
    ...mapState([
      'localToken',
      'app',
    ]),
    realComments() {
      let list = this.comments
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        if (item.reply_id) {
          for (let i = 0; i < list.length; i++) {
            if (list[i].id === item.reply_id) {
              item.reply_id = list[i]
            }
          }
        }
      }
      return list
    },
  },
  async mounted() {
    if (this.localToken) {
      const { data } = await this.USER_INFO()
      this.userInfo = data
    }
  },
  methods: {
    ...mapActions([
      'USER_INFO',
      'CREATE_COMMENT',
      'COMMENTS',
      'SEND_EMAIL',
    ]),
    githubLogin() {
      this.$Loading.start('授权中...')
      window.location.href = `${this.app.baseUrl}/oauth/github/${this.articleId}`
    },
    async submitComment() {
      if (!this.commentContent) { return false }
      this.disabled = true
      const { data } = await this.CREATE_COMMENT({
        id: this.articleId,
        content: this.commentContent,
        replyId: this.replyId
      })
      const comments = await this.COMMENTS()
      this.comments.push(comments.data[0])
      // 回复邮件通知
      if(this.app.isSMTPConfig && this.replyId) {
        let lastIndex = this.realComments.length - 1
        let lastItem = this.realComments[lastIndex]
        this.SEND_EMAIL({
          fromUserNickname: lastItem.user.username,
          fromUserContent: lastItem.content,
          fromUserEmail: lastItem.user.email,
          toUserNickname: lastItem.replyId.user.username,
          toUserContent: lastItem.replyId.content,
          toUserEmail: lastItem.replyId.user.email,
          articleId: lastItem.article.id
        })
      }
      // 状态重置
      this.disabled = false
      this.placeholder = ''
      this.commentContent = ''
      this.replyId = ''
    },
    replyComment(username, id) {
      if (!this.localToken) {
        this.githubLogin()
      } else {
        this.replyId = id
        this.placeholder = `回复 ${username} `
        this.$refs.commentTextarea.focus()
      }
    },
  }
}

</script>


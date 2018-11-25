<template>
  <div class="blog-comment">
    <div class="comment-list">
      <ul>
        <li v-for="item in realComments" :key="item.id">
          <div class="list-header clearfix">
            <a :href="`https://github.com/${item.user.username}`" class="header-avatar">
              <img :src="item.user.avatar" :alt="item.user.username" width="30px" height="30px">
            </a>
            <a :href="`https://github.com/${item.user.username}`" class="header-username">{{item.user.username}}</a>
            <div class="header-reply" v-if="item.replyId">
              <span>回复</span>
              <a :href="`https://github.com/${item.replyId.user.username}`" class="header-username">{{item.replyId.user.username}}</a>
            </div>
            <span class="header-time">{{item.createdAt | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
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
    <div v-if="githubToken" class="comment-login clearfix">
      <div class="comment-box">
        <a :href="userInfo.html_url">
          <img :src="userInfo.avatar_url" :alt="userInfo.name" width="50px" height="50px">
        </a>
        <textarea v-model="commentContent" :placeholder="placeholder" class="box-content" maxlength="300" ref="commentTextarea"></textarea>
      </div>
      <wmui-button className="wmui-btn-primary" @click.native="submitComment" :disabled="disabled">提交留言</wmui-button>
    </div>
    <div v-else class="comment-unlogin">
      <wmui-button className="wmui-btn-primary" @click.native="githubLogin">Github 登录</wmui-button>
      <p>{{ tipMessage }}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {mapState, mapGetters} from 'vuex'
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
      tipMessage: '欢迎留言交流',
      commentContent: '',
      userInfo: {},
      comments: this.commentList,
      replyId: '',
      placeholder: ''
    }
  },
  computed: {
    realComments() {
      // 把replayId替换成用户信息
      let list = this.comments
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        if (item.replyId) {
          for (let i = 0; i < list.length; i++) {
            if (list[i].id === item.replyId) {
              item.replyId = list[i]
            }
          }
        }
      }
      return list
    },
    ...mapState([
      'githubToken',
      'githubApi'
    ]),
    ...mapGetters([
      'isSMTPConfig'
    ])
  },
  mounted() {
    if (this.githubToken) {
      let u = this.githubApi.userInfo + this.githubToken
      axios.get(u).then(data => {
        this.userInfo = data.data
      })
    }
  },
  methods: {
    githubLogin() {
      this.tipMessage = '请稍等...'
      window.location.href = `${this.$store.getters.baseUrl}/oauth/github/${this.articleId}`
    },
    submitComment() {
      if (!this.commentContent) { return false }
      this.disabled = true
      this.$store.dispatch('CREATE_COMMENT', {
        id: this.articleId,
        content: this.commentContent,
        token: this.githubToken,
        replyId: this.replyId
      }).then((data) => {
        if (data.success) {
          this.$store.dispatch('COMMENTS').then((data) => {
            this.comments.push(data.data[0])

            // 回复邮件通知
            if(this.isSMTPConfig && this.replyId) {
              let lastIndex = this.realComments.length - 1
              let lastItem = this.realComments[lastIndex]
              this.sendEmail({
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
          })
        }
      })
    },
    replyComment(username, id) {
      if (!this.githubToken) {
        this.githubLogin()
      } else {
        this.replyId = id
        this.placeholder = `回复 ${username} `
        this.$refs.commentTextarea.focus()
      }
    },
    sendEmail(params){
      this.$store.dispatch('SEND_EMAIL',params)
    }
  }
}

</script>


<template>
  <div class="top-comment">
    <div class="comment-list">
      <ul>
        <li v-for="(item,index) in realComments" :key="item.id">
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
    <div v-if="isGithubLogin" class="comment-login clearfix">
      <div class="comment-box">
        <a :href="userInfo.html_url">
          <img :src="userInfo.avatar_url" :alt="userInfo.name" width="50px" height="50px">
        </a>
        <textarea v-model="commentContent" :placeholder="placeholder" class="box-content" maxlength="300" ref="commentTextarea"></textarea>
      </div>
      <button @click="submitComment" :disabled="disabled">提交留言</button>
    </div>
    <div v-else class="comment-unlogin">
      <button @click="githubLogin">Github 登录</button>
      <p>{{ tipMessage }}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'top-comment',
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
      isGithubLogin: this.$store.state.githubToken ? true : false,
      isSMTPConfig: this.$store.getters.isSMTPConfig,
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
    }
  },
  mounted() {
    if (this.isGithubLogin) {
      let u = this.$store.state.githubApi.userInfo + this.$store.state.githubToken
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
        token: this.$store.state.githubToken,
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
      if (!this.isGithubLogin) {
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
<style lang="scss">
@import '~/assets/css/var.scss';
.top-comment {
  img {
    border-radius: 3px;
    margin-right: 15px;
  }
  .comment-list {
    ul {
      list-style: none;
      li {
        margin-bottom: 20px;
        border-bottom: 1px solid #ddd;
      }
      .list-header {
        position: relative;
        margin-bottom: 10px;
        font-size: 14px;
        .header-avatar {
          float: left;
        }
        .header-reply {
          display: inline-block;
          vertical-align: top;
          line-height: 1;
          span {
            font-size: 13px;
            color: #999;
            padding: 0 5px;
          }
        }
        .header-username {
          line-height: 1;
          vertical-align: top;
        }
        .header-time {
          position: absolute;
          top: 12px;
          left: 45px;
          font-size: 13px;
          color: #999;
        }
      }
      .list-content {
        margin-bottom: 10px;
      }
      .list-handler {
        margin-bottom: 15px;
        .handler-reply {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
  .comment-box {
    display: flex;
    .box-content {
      width: 100%;
      height: 100px;
      border: none;
      border: 1px solid #ddd;
      padding: 10px;
      resize: vertical;
      border-radius: 3px;
    }
  }

  .comment-login {
    button {
      margin-top: 15px;
      float: right;
    }
  }
  .comment-unlogin {
    background-color: #eee;
    text-align: center;
    border-radius: 3px;
    padding: 15px;
    p {
      font-size: 14px;
      color: #999;
      margin-top: 10px;
    }
  }
}

</style>

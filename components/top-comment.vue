<template>
  <div class="top-comment">
    <div class="comment-list">
      <ul>
        <li v-for="(item,index) in comments" :key="item.id">
          <a :href="`https://github.com/${item.user.username}`">
            <img :src="item.user.avatar" :alt="item.user.nickname" width="50px" height="50px">
          </a>
          <div class="list-item">
            <div class="item-comment">
              <a :href="`https://github.com/${item.user.username}`">{{item.user.username}}</a>
            <span class="comment-time"> 评论于 {{item.createdAt | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
            <p>{{item.content}}</p>
            <a class="comment-reply" @click="replyComment(item.user.username, item.id)">回复</a>
            </div>
            <!-- <div class="item-reply">
              <span class="author">博主</span>
              <p>作者回复作者回复作者回复作者</p>
            </div> -->
          </div>
        </li>
      </ul>
    </div>
    <div v-if="isGithubLogin" class="comment-login clearfix">
      <div class="comment-box">
        <a :href="userInfo.html_url">
          <img :src="userInfo.avatar_url" :alt="userInfo.name" width="50px" height="50px">
        </a>
        <textarea v-model="commentContent" placeholder="留言" class="box-content" maxlength="300" ref="commentTextarea"></textarea>
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
      tipMessage: '欢迎留言交流',
      commentContent: '',
      userInfo: {},
      comments: this.commentList,
      replyId: ''
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
  watch: {
    commentContent() {
      if(this.commentContent === '') {
        this.replyId = ''
      }
    }
  },
  methods: {
    githubLogin() {
      this.tipMessage = '请稍等...'
      window.location.href = `${this.$store.getters.baseUrl}/oauth/github/${this.articleId}`
    },
    submitComment() {
      this.disabled = true
      if (!this.commentContent) { return false }
      this.$store.dispatch('CREATE_COMMENT', {
        id: this.articleId,
        content: this.commentContent,
        token: this.$store.state.githubToken,
        replyId: this.replyId
      }).then((data) => {
        if (data.success) {
          this.$store.dispatch('COMMENTS').then((data) => {
            this.comments.push(data.data[0])
            this.disabled = false
            this.commentContent = ''
            this.replyId = ''
          })
        }
      })
    },
    replyComment(username, id) {
      if(!this.isGithubLogin) {
        this.githubLogin()
      }else{
        this.replyId = id
        this.commentContent = `@${username} `
        this.$refs.commentTextarea.focus()
      }
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
        display: flex;
        margin-bottom: 20px;
      }
      .list-item {
        position: relative;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 3px;
        padding: 10px;
        p {
          font-size: 14px;
        }
        .comment-time {
          font-size: 14px;
          color: #666;
        }
        .comment-reply {
          position: absolute;
          right: 10px;
          bottom: 10px;
          font-size: 14px;
        }
        &::after {
          position: absolute;
          top: 15px;
          left: -6px;
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-left: 1px solid #ddd;
          transform: rotate(-45deg);
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

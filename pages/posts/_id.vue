<template>
  <div class="posts">
    <h1 class="title">{{ article.title }}</h1>

    <section class="article">
      <editor-preview :content="article.content" />
    </section>

    <!-- <section class="pn">
      <p><span>&laquo;</span><a href="#">上一篇我文章</a></p>
      <p><a href="#">上一篇我文章</a><span>&raquo;</span></p>
    </section> -->

    <div class="tip">
      <p class="meta">
        posted @ {{ article.createdAt | formatDate('yyyy-MM-dd hh:mm:ss') }} 浏览({{ article.views }})
        <nuxt-link :to="`/?category=${article.category.id}&page=1`">{{ article.category.title }}</nuxt-link>
      </p>
      <div
        v-if="token"
        class="btns"
      >
        <button
          class="small"
          @click="handleDelete"
        >删除</button>
        <button
          class="small"
          @click="$router.push(`/admin/posts?id=${article.id}`)"
        >编辑</button>
      </div>
    </div>

    <section class="comment">
      <div
        v-for="item in comments"
        :key="item.id"
        class="item"
      >
        <img
          :src="item.avatar"
          alt="avatar"
          width="48px"
          height="48px"
          class="left"
        >
        <div class="right">
          <div class="top">
            <span class="nickname">{{ item.nickname }}</span>
          </div>
          <p class="content">{{ item.content }}</p>
          <p
            v-if="item.reply"
            class="reply"
          >博主：{{ item.reply }}</p>
        </div>
      </div>
      <div class="box">
        <img
          src="~/static/none.jpg"
          alt="avatar"
          width="48px"
          height="48px"
          class="left"
        >
        <div class="right">
          <textarea
            v-model="commentTmp.content"
            rows="5"
            placeholder="留言内容"
          />
          <div class="input">
            <input
              v-model="commentTmp.nickname"
              type="text"
              placeholder="你的大名（必填）"
            >
          </div>
          <div class="input">
            <input
              v-model="commentTmp.email"
              type="text"
              placeholder="你的邮箱（必填，不会被公开）"
            >
          </div>
          <button
            class="primary"
            @click="handlePostComment">一言既出</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { cutString } from '~/plugins/filters'

export default {
  async fetch({ store, route, error }) {
    await store.dispatch('getArticle', route.params.id).catch(err => error({ statusCode: 404 }))
  },
  head() {
    return {
      title: `${this.article.title} - ${this.admin.nickname}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.article.category.title,
        },
        {
          hid: 'description',
          name: 'description',
          content: cutString(this.article.content, 60),
        },
      ],
    }
  },
  data() {
    return {
      commentTmp: {},
    }
  },
  computed: {
    ...mapState([
      'article',
      'comments',
      'token',
      'admin',
    ])
  },
  mounted() {
    this.setDefault()
    this.getCommentsById(this.article.id)
  },
  methods: {
    ...mapActions([
      'getArticle',
      'deleteArticle',
      'postComment',
      'getCommentsById',
      'postEmail',
    ]),
    setDefault() {
      this.commentTmp = {
        id: this.article.id,
        email: localStorage.getItem('email') || '',
        nickname: localStorage.getItem('nickname') || '',
        content: '',
      }
    },
    async handleDelete() {
      const val = confirm('确定要删除吗')
      if (val) {
        await this.deleteArticle(this.article.id)
        this.$router.back()
      }
    },
    async handlePostComment() {
      if (!this.commentTmp.email || !this.commentTmp.nickname || !this.commentTmp.content) return

      const { success } = await this.postComment(this.commentTmp)

      if (success) {
        localStorage.setItem('nickname', this.commentTmp.nickname)
        localStorage.setItem('email', this.commentTmp.email)
        await this.getCommentsById(this.article.id)
        // 邮件通知作者
        this.postEmail({
          fromUser: this.commentTmp.nickname,
          toUser: this.admin.nickname,
          toUserEmail: this.admin.email,
          content: this.commentTmp.content,
          id: this.article.id,
        })
        this.setDefault()
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.posts {
  margin-bottom: 30px;
  .title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 15px;
  }
  .article {
    margin-bottom: 20px;
  }
  .pn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .tip {
    color: #666;
    display: flex;
    margin-bottom: 30px;
    .meta {
      margin-right: 20px;
    }
    .btns {
      cursor: pointer;
      color: $main-color;
    }
  }
  .comment {
    .item,
    .box {
      display: flex;
      .left {
        margin-right: 15px;
        border-radius: 3px;
      }
      .right {
        flex: 1;
        .top {
          display: flex;
          justify-content: space-between;
          .nickname {
            color: #666;
          }
          .btn {
            color: $main-color;
            cursor: pointer;
            margin-left: 15px;
          }
        }
        .input {
          width: 300px;
          display: block;
          margin-bottom: 10px;
          position: relative;
        }
        textarea {
          margin-bottom: 10px;
        }
      }
    }
    .item {
      .right {
        margin-bottom: 30px;
      }
      .reply {
        &::before {
          content: "";
          border-left: 3px solid #ccc;
          margin-right: 3px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="essay">
    <div class="form">
      <div class="title">
        <input type="text" v-model="title" placeholder="文章标题" autofocus>
      </div>
      <div class="content">
        <top-editor v-model="content" :upload="upload" :options="options" v-show="isBrowser"></top-editor>
      </div>
      <div class="bottom">
        <div class="tag">
          <input type="text" v-model="tag" placeholder="多个标签以英文逗号分隔">
        </div>
        <div class="btn">
          <button type="button" @click="publish('publish')">发布</button>
          <button type="button" @click="publish('draft')">存草稿</button>
        </div>
      </div>
      <div class="tags">
        <span>选择已有标签: </span>
        <span v-for="(item,index) in $store.state.tags" :key="index" @click="chooseTag(item)"><a>{{item.tag}}</a></span>
      </div>
    </div>
  </div>
</template>
<script>
const hljs = process.browser ? require('highlight.js') : ''
export default {
  name: 'Publish',
  /* 中间层进行认证验证 */
  middleware: 'auth',
  layout: 'admin',
  /* 无认证重定向 */
  fetch({ redirect, store }) {
    if (!store.state.authUser) {
      redirect('/login')
      return
    }
  },
  data() {
    return {
      title: '',
      content: '',
      tag: '',
      date: '',
      upload: {
        url: 'http://localhost:8080/api/upload'
      },
      isBrowser: process.browser,
      options: {}
    }
  },

  async mounted() {
    this.options = {
      linkify: true,
      highlight(str, lang) {
        lang = lang || 'javascript'
        if (hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (__) {}
        }
        return ''
      }
    }
    const articleID = this.$route.params.id 
    // 有id就获取文章内容
    if (articleID) {
      await this.$store.dispatch('ARTICLE_DETAIL',articleID)
      this.title = this.$store.state.articleDetail.title
      this.content = this.$store.state.articleDetail.content
      let tag = this.$store.state.articleDetail.tag
      this.tag = tag.join(',') + ','
      this.date = this.$store.state.articleDetail.date
    }
  },
  methods: {
    async publish(state) {
      if (!this.title) {
        this.$toast('文章标题不能为空！')
        return
      }
      if (!this.content) {
        this.$toast('文章正文不能为空！')
        return
      }
      await this.$store.dispatch('PUBLISH_ARTICLE',{
        title: this.title,
        content: this.content,
        tag: this.trim(this.tag),
        state: state,
        date: Number(this.date) || Date.now()
      })
      
     // this.$router.push('/admin')
    },

    // 把多个标签分割成数组
    trim(str) {
      return str.replace(/(^\s*)|(\s*$)|(,$)/g, '').split(',')
    },

    // 选择已有标签
    chooseTag(item) {
      this.tag = this.tag + item.tag + ','
    }
  }
}
</script>
<style lang="scss">
@import '~assets/css/var.scss';
.essay {
  .form {
    padding: 30px 15px;
    .title {
      input[type="text"] {
        display: block;
        width: 100%;
        margin-bottom: 20px;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      input[type="text"] {
        width: 400px;
      }
      button:nth-child(1) {
        background-color: #24292E;
        margin-right: 20px;
        color: #fff;
      }
    }
    .tags {
      color: gray;
      padding: 10px 0;
      span {
        display: inline-block;
        margin-left: 10px;
        a {
          cursor: pointer !important;
        }
      }
      span:nth-child(1) {
        margin-left: 0;
      }
    }
  }
}
</style>
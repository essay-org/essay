<template>
  <div class="essay">
    <div class="form">
      <div class="title">
        <input type="text" v-model="title" placeholder="文章标题" autofocus>
      </div>
      <p class="publish-tip">{{ publishTip }}</p>
      <div class="content">
        <no-ssr>
          <top-editor v-model="content" :upload="upload" :options="options"></top-editor>
        </no-ssr>
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
import TopEditor from 'top-editor/src/lib/TopEditor.vue'
export default {
  name: 'Publish',
  layout: 'admin',
  middleware: 'auth',
  fetch ({redirect, store}) {
    if (!store.state.token) {
      redirect('/login')
    }
  },
  data() {
    return {
      title: '',
      content: '',
      tag: '',
      date: '',
      publishTip: '',
      articleID: this.$route.params.id || '',
      upload: {
        url: 'http://localhost:8080/v1/upload',
        headers: {
          token: this.$store.state.token
        }
      },
      options: {}
    }
  },

  mounted() {
    if(process.browser){
    this.options = {
      linkify: true,
      highlight(str, lang) {
        lang = lang || 'javascript'
        if (require('highlight.js').getLanguage(lang)) {
          try {
            return require('highlight.js').highlight(lang, str).value
          } catch (__) {}
        }
        return ''
      }
    }
  }

    // 有id就获取文章内容
    if (this.articleID) {
      this.$store.dispatch('ARTICLE_DETAIL',this.articleID)
      let articleDetail  = this.$store.state.articleDetail
      this.title = articleDetail.title
      this.content = articleDetail.content
      let tag = articleDetail.tag
      this.tag = tag.join(',') + ','
      this.date = articleDetail.date
    }
  },
  methods: {
    async publish(state) {
      if (!this.title) {
       this.publishTip = '文章标题不能为空！'
        return
      }
      if (!this.content) {
        this.publishTip = '文章正文不能为空！'
        return
      }
      await this.$store.dispatch('PUBLISH_ARTICLE', {
        title: this.title,
        content: this.content,
        tag: this.trim(this.tag),
        state: state,
        date: Number(this.date) || Date.now()
      })
      this.publishTip = this.$store.state.status.message
      //  发布成功
       this.title = ''
       this.content = ''
       this.tag = ''
    },

    // 把多个标签分割成数组
    trim(str) {
      return str.replace(/(^\s*)|(\s*$)|(,$)/g, '').split(',')
    },

    // 选择已有标签
    chooseTag(item) {
      this.tag = this.tag + item.tag + ','
    }
  },
  components: {
    TopEditor
  }
}
</script>

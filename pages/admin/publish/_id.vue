<template>
  <div class="admin-publish container">
    <div class="publish-title">
      <input type="text" placeholder="文章标题" v-model="title">
    </div>
    <div class="publish-content">
      <top-editor v-model="content" :upload="upload" :options="options"></top-editor>
    </div>
    <div class="publish-handle">
      <input type="text" placeholder="回车可创建新标签" v-model="tag" @keyup.enter="addTag">
      <ul class="handle-tag">
        <li v-for="(item, index) in currentTags" :key="index"> {{ item.name }} <span @click="delTag(item, index)">&times;</span></li>
      </ul>
      <div class="handle-button">
        <button class="button-private" @click="publish(false)">存草稿</button>
        <button class="black-button" @click="publish(true)">发布</button>
      </div>
    </div>
    <div class="publish-tags">
      <p>插入标签：</p>
      <a v-for="(tag,index) in tags" :key="index" @click="chooseTag(tag)">{{ tag.name }}</a>
    </div>
    <Tip ref="tip"></Tip>
  </div>
</template>
<script>
import TopEditor from 'top-editor/src/lib/TopEditor.vue'
export default {
  middleware: 'auth',
  data() {
    return {
      upload: {
        url: this.$store.getters.baseUrl + '/upload',
        headers: {
          token: this.$store.state.token
        }
      },
      options: {},
      tags: [],
      tag: '',
      id: '',
      title: '',
      content: '',
      currentTags: [],
      tagsID: []
    }
  },

  async mounted() {
    if (process.browser) {
      this.options = {
        linkify: true,
        highlight(str, lang = 'javascript') {
          if (require('highlight.js').getLanguage(lang)) {
            try {
              return require('highlight.js').highlight(lang, str).value
            } catch (__) {}
          }
          return ''
        }
      }
    }

    await this.$store.dispatch('TAGS').then((data) => {
      this.tags = data.data
    })

    if (this.$route.params.id) {
      let id = this.$route.params.id
      await this.$store.dispatch('ARTICLE_DETAIL', id).then((data) => {
        this.id = data.data.id
        this.title = data.data.title
        this.content = data.data.content
        this.currentTags = data.data.tags
      })
    }
  },
  methods: {
    chooseTag(tag) {
      if (this.currentTags.findIndex(item => item.name === tag.name) > -1) {
        this.$refs.tip.openTip('标签已存在！')
        return
      }
      this.currentTags.push(tag)
    },

    delTag(tag, index) {
      this.currentTags.splice(index, 1)
    },

    addTag() {
      if (this.tags.findIndex(item => item.name === this.tag) > -1) {
        // add tag
        this.tags.forEach((item) => {
          if (item.name === this.tag) {
            this.currentTags.push(item)
            this.tag = ''
          }
        })
      } else {
        // create tag
        this.$store.dispatch('CREATE_TAG', { name: this.tag }).then((data) => {
          if(data.success) {
            this.currentTags.push(data.data)
            this.tag = ''
            this.$refs.tip.openTip('标签创建完成')
          }
        })
      }
    },

    publish(isPublish) {
      if (!this.title || !this.content) {
        this.$refs.tip.openTip('标题和内容不能为空！')
        return
      }

      this.currentTags.forEach((item) => {
        this.tagsID = []
        this.tagsID.push(item.id)
      })

      let article = {}
      // update article
      if (this.id) {
        article = {
          id: this.id,
          title: this.title,
          content: this.content,
          publish: isPublish,
          tags: this.tagsID
        }
        this.$store.dispatch('UPDATE_ARTICLE', article).then((data) => {
          if (data.success) {
            this.$refs.tip.openTip('文章更新完成')
          }
        })
      } else {
        // create article or draft
        article = {
          title: this.title,
          content: this.content,
          publish: isPublish,
          tags: this.tagsID
        }

        this.$store.dispatch('CREATE_ARTICLE', article).then((data) => {
          if (data.success) {
            this.$refs.tip.openTip('文章创建完成')
            this.title = ''
            this.content = ''
            this.currentTags = []
          }
        })
      }
    }
  },
  components: {
    TopEditor
  }
}

</script>

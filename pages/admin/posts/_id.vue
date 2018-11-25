<template>
  <div class="admin-publish">
    <input type="text" placeholder="文章标题" v-model="article.title" class="publish-title">
    <div class="publish-flag">
      <wmui-radio 
        v-for="item in flag" :key="item.state"
        v-model="article.flag" 
        :radioValue="item.state"
        :radioText="item.name"
        name="flag"/>
    </div>
    <div class="publish-content">
      <wmui-edit v-model="article.content" :upload="upload" @save="save" />
    </div>
    <div class="publish-handle">
      <input type="text" placeholder="回车可创建新标签" v-model="tag" @keyup.enter="addTag">
      <ul class="handle-tag">
        <li v-for="(item, index) in article.tags" :key="index"> {{ item.name }} <span @click="delTag(item, index)">&times;</span></li>
      </ul>
      <div class="handle-button">
        <wmui-button className="wmui-btn-primary" @click.native="publish">发布</wmui-button>
      </div>
    </div>
    <div class="publish-tags">
      <p class="tags-intro">插入标签：</p>
      <div class="tags-all">
        <a v-for="(tag,index) in tags" :key="index" @click="chooseTag(tag)">{{ tag.name }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  middleware: 'auth',
  data() {
    return {
      upload: {
        url: this.$store.getters.baseUrl + '/upload',
        headers: {
          token: this.token,
        },
      },
      article: {
        title: '',
        content: '',
        tags: [],
        flag: 3,
      },
      tags: [],
      tag: '',
      flag: [
        {
          state: 0,
          name: '置顶',
        },
        {
          state: 1,
          name: '首页显示'
        },
        {
          state: 2,
          name: '标签页显示'
        },{
          state: 3,
          name: '草稿'
        },
      ],
    }
  },
  head() {
    return {
      title: `发布文章 - ${this.user.nickname}`
    }
  },
  computed: {
    ...mapState([
      'user',
      'token'
    ])
  },
  mounted() {
    this.$store.dispatch('TAGS').then((data) => {
      this.tags = data.data
    })
    if (this.$route.params.id) {
      let id = this.$route.params.id
      this.$store.dispatch('ARTICLE_DETAIL', id).then((data) => {
        this.article = data.data
      })
    }
  },
  methods: {
    chooseTag(tag) {
      if (this.article.tags.findIndex(item => item.name === tag.name) > -1) {
        this.$Toast({text: '标签已存在'})
        return false
      }
      this.article.tags.push(tag)
    },
    delTag(tag, index) {
      this.article.tags.splice(index, 1)
    },
    addTag() {
      if (this.tags.findIndex(item => item.name === this.tag) > -1) {
        // add tag
        this.tags.forEach((item) => {
          if (item.name === this.tag) {
            this.article.tags.push(item)
            this.tag = ''
          }
        })
      } else {
        // create tag
        this.$store.dispatch('CREATE_TAG', { name: this.tag }).then((data) => {
          if (data.success) {
            this.article.tags.push(data.data)
            this.$Toast({
              text: '标签创建完成'
            })
            this.tag = ''
          }
        })
      }
    },
    publish() {
      let tagsID = []
      if (!this.article.title || !this.article.content) {
        this.$Toast({text: '标题和内容不能为空'})
        return false
      }
      this.article.tags.forEach((item) => {
        tagsID.push(item.id)
      })
      let article = Object.assign({}, this.article, {tags: tagsID})
      if (this.article.id) {
        this.$store.dispatch('UPDATE_ARTICLE', article).then((data) => {
          if (data.success) {
            this.$Toast({text: '文章已更新'})
          }
        })
      } else {
        this.$store.dispatch('CREATE_ARTICLE', article).then((data) => {
          if (data.success) {
            this.$Toast({text: '文章创建完成'})
            this.article = {
              title: '',
              content: '',
              tags: [],
              flag: 3,
            }
          }
        })
      }
    },
    save(val) {
      if (val === true) {
        // ctrl + s save article
        this.publish()
      }
    }
  }
}

</script>

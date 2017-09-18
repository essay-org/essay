<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="admin-content">
      <div class="essay">
        <div class="form">
          <div class="title">
            <input type="text" v-model="title" placeholder="文章标题" autofocus>
          </div>
          <div class="content">
            <mavon-editor @imgAdd="imgAdd" v-model="content" ref="editor" :subfield="false"></mavon-editor>
          </div>
          <div class="bottom">
            <div class="tag">
              <input type="text" v-model="tag" placeholder="多个标签以英文逗号分隔">
            </div>
            <div class="btn">
              <button type="button" @click="publish">发布</button>
              <button type="button" @click="draft">存草稿</button>
            </div>
          </div>
          <div class="tags">
            <span>选择已有标签: </span>
            <span v-for="(item,index) in tags" :key="index" @click="chooseTag(item)"><a>{{item.tag}}</a></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminAside from '../../components/admin/AdminAside.vue'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'Publish',
  data () {
    return {
      title: '',
      content: '',
      tag: '',
      date: '',
      articleID: this.$route.params.id,
      imgFile: {},
      relativeUrl: ''
    }
  },

  mounted () {
    if (this.articleID) {
      this.axios.get(`/article?id=${this.articleID}`).then((data) => {
        let result = data.data.result[0]
        this.title = result.title
        this.content = result.content
        let tag = result.tag
        this.tag = tag.join(',') + ','
        this.date = result.date
      })
    }
  },
  methods: {
    // 发布文章
    publish () {
      if (!this.title) {
        this.$toasted.show('文章标题不能为空！')
        return
      }

      if (!this.content) {
        this.$toasted.show('文章正文不能为空！')
        return
      }

      this.axios.post('/article', {
        'title': this.title,
        'content': this.content,
        'tag': this.trim(this.tag),
        'state': 'publish',
        'date': Number(this.date) || Date.now()
      }).then((data) => {
        this.$router.push({
          name: 'admin'
        })
      })
    },

    // 保存为草稿
    draft () {
      this.axios.post('/article', {
        'title': this.title,
        'content': this.content,
        'tag': this.trim(this.tag),
        'state': 'draft',
        'date': Number(this.date) || Date.now()
      }).then((data) => {
        this.$router.push({
          name: 'admin'
        })
      })
    },

    // 把多个标签分割成数组
    trim (str) {
      return str.replace(/(^\s*)|(\s*$)|(,$)/g, '').split(',')
    },

    // 选择已有标签
    chooseTag (item) {
      this.tag = this.tag + item.tag + ','
    },

    // 上传图片时会触发该函数
    imgAdd (pos, file) {
      this.imgFile[pos] = file
      this.relativeUrl = pos
      this.uploadimg()
      // this.$refs.editor.$imgDelByFilename(pos)
    },

    // 把图片数据提交到后台，返回图片的url
    uploadimg () {
      let formdata = new FormData()
      for (let _img in this.imgFile) {
        formdata.append(_img, this.imgFile[_img])
      }
      this.axios.post('/upload', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((result) => {
        let actualUrl = result.data.result
        this.$refs.editor.$img2Url(this.relativeUrl, actualUrl)
        this.$toasted.show(result.data.message)
      })
    }
  },
  components: {
    AdminAside,
    mavonEditor
  },
  computed: {
    tags () {
      return this.$store.state.tags
    }
  },
  asyncData ({
    store,
    route
  }) {
    return store.dispatch('TAGS')
  }
}
</script>
<style lang="scss">
  .content {
    margin-bottom: 20px;
  }
  .v-note-wrapper {
    min-height: 450px !important;
  }
</style>
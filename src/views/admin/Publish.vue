<template>
  <div class="admin">
    <admin-aside></admin-aside>
    <div class="content">
      <div class="essay">
        <div class="form clearfix">
          <div class="title">
            <input type="text" v-model="title" placeholder="文章标题" autofocus>
          </div>
          <div>
            <textarea id="editor" placeholder="文章内容" class="markdown-body"></textarea>
          </div>
          <div class="bottom clearfix">
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
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import AdminAside from '../../components/admin/AdminAside.vue'
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
})
export default {
  data() {
      return {
        title: '',
        content: '',
        tag: ''
      }
    },
    mounted() {
      var that = this;
      var smde = new SimpleMDE({
        element: document.getElementById('editor'),
        autosave: true,
        previewRender: function(plainText) {
          return marked(plainText);
        }
      });
      smde.codemirror.on("change", function() {
        that.content = marked(smde.value());
      });
    },
    methods: {
      publish() {
        this.axios.post('/publish', {
          "title": this.title,
          "content": this.content,
          "tag": this.trim(this.tag),
          "state":"publish"
        })
      },
      draft() {
        this.axios.post('/publish', {
          "title": this.title,
          "content": this.content,
          "tag": this.trim(this.tag),
          "state":"draft"
        })
      },
      trim(str) {
        return str.replace(/(^\s*)|(\s*$)|(,$)/g, '').split(',');
      },
      chooseTag(item) {
        this.tag = this.tag + item.tag + ',';
      }
    },
    components: {
      AdminAside
    },
    computed: {
      tags(){
        return this.$store.state.tags
      }
    },
    asyncData({store,route}) {
      return store.dispatch('GETTAGS')
    }
}
</script>

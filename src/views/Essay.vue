<template>
  <div class="essay">
    <my-header></my-header>
    <div class="form container clearfix">
      <div class="title">
        <input type="text" v-model="title" placeholder="文章标题">
      </div>
      <div class="content">
        <textarea id="editor" placeholder="文章内容" class="markdown-body"></textarea>
      </div>
      <div class="tag">
        <input type="text" v-model="tag" placeholder="多个标签以英文逗号分隔">
      </div>
      <div class="btn">
        <button type="button" @click="publish">发布</button>
        <button type="button">存草稿</button>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import MyHeader from '../components/global/MyHeader.vue'
import MyFooter from '../components/global/MyFooter.vue'
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
  name:'essay',
  data() {
      return {
        title: '',
        content: '',
        tag: ''
      }
    },
    mounted() {
      var that = this
      var smde = new SimpleMDE({
        element: document.getElementById('editor'),
        autofocus: true,
        autosave: true,
        previewRender: function(plainText) {
          return marked(plainText);
        }
      });
      smde.codemirror.on("change", function() {
        that.content = marked(smde.value());
        // that.content = smde.value();
      });
    },
    methods: {
      publish() {
        this.axios.post('/publish', {
          "title": this.title,
          "content": this.content,
          "tag": this.trim(this.tag)
        })
      },
      trim(str) {
        return str.replace(/(^\s*)|(\s*$)|(,$)/g, '').split(',');
      }
    },
    components: {
      MyHeader,
      MyFooter
    }
}
</script>
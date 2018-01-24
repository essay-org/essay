<template>
	<div class="content-preview markdown-body" v-html="html"></div>
</template>
<script>
import markdownIt from 'markdown-it'
export default {
	name:'TopPreview',
	props: ['content', 'options'],
	data () {
		return {
			html:''
		}
	},
	watch: {
		content () {
			this.renderIt()
		},

    // 配置文件变化后重新初始化
    options: {
      deep: true,
      handler() {
        this.initMarkdown()
      }
    }
	},
	methods: {
    // 初始化配置文件
    initMarkdown() {
      // 可在这里配置默认项
      let options = {
        html: true,
        breaks: true,
        ...this.options
      }
      this.markdownit = markdownIt(options)
      this.renderIt()
    },
    renderIt() {
      this.html = this.markdownit.render(this.content)
    }
	},
  mounted () {
    this.initMarkdown()
  }
}
</script>
<style>
	@import "./styles/github-markdown.css";
</style>
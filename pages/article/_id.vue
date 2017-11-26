<template>
  <div class="article-detail">
    <h3 class="title">{{article.title}}</h3>
    <!-- 为浏览器环境时显示 -->
    <top-preview :content="article.content" :options="options" v-show="isBrowser"></top-preview>
    <div class="manage" v-show="isAdmin">
      <span><a @click="edit">编辑</a></span>
      <span><a @click="del">删除</a></span>
    </div>
  </div>
</template>
<script>
const hljs = process.browser ? require("highlight.js") : "";
export default {
  name: "article-detail",
  async fetch({ store, params }) {
    await store.dispatch("ARTICLE_DETAIL", params.id);
  },
  head() {
    return {
      title: this.article.title + " | vueblog"
    };
  },
  data() {
    return {
      isBrowser: process.browser,
      options: {}
    };
  },
  // 一定要在mounted后配置
  mounted() {
    this.options = {
      linkify: true,
      highlight(str, lang) {
        lang = lang || "javascript";
        if (hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
        return "";
      }
    };
  },
  computed: {
    article() {
      return this.$store.state.articleDetail;
    },
    isAdmin() {
      return this.$store.state.token ? true : false;
    }
  },
  methods: {
    async del() {
      let id = this.$route.params.id
      await this.$store.dispatch("DEL_ARTICLE", id);
      console.log(this.$store.state.status);
    },
    edit() {
      const id = this.$route.params.id;
      this.$router.push({ name: "publish-id", params: { id: id } });
    }
  }
};
</script>

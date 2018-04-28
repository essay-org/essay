<template>
  <div class="detail">
    <h1 class="detail-title">{{ article.title }}</h1>
    <div class="detail-meta">
      <span>
        {{ article.createdAt | formatDate('yyyy-MM-dd') }}
        <span class="meta-division">/</span> {{ article.updatedAt | formatDate('yyyy-MM-dd') }}
      <span class="meta-division">/</span> {{ article.views }}次浏览
      </span>
    </div>
    <div class="detail-content">
      <top-preview :content="article.content" :options="options"></top-preview>
    </div>
    <p class="detail-tags">
      <nuxt-link v-for="(tag, index) in article.tags" :key="index" :to="'/tags/' + tag.id">{{ tag.name }}</nuxt-link>
    </p>
    <div class="detail-copyright">
      <p>文章采用 <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">知识共享署名 4.0 国际许可协议</a> 进行许可，转载时请注明原文链接。</p>
    </div>
    <div class="detail-admin" v-if="isLogin">
      <p class="admin-del"><a @click="del(article.id)">删除</a></p>
      <p class="admin-edit"><a @click="edit(article.id)">编辑</a></p>
    </div>
    <no-ssr>
      <top-comments shortname="vueblog-1" :identifier="article.id"/>
    </no-ssr>
    <top-tip ref="tip" />
  </div>
</template>
<script>
import { cutString } from '~/plugins/filters'
export default {
  async asyncData({ store, route, error }) {
    let id = route.params.id || ''
    const { data } = await store.dispatch('ARTICLE_DETAIL', id)
    if(!id) {
      error({
        message: 'This page could not be found',
        statusCode: 404
     })
      return false
    }
    return {
      article: data || {}
    }
  },
  head() {
    return {
      title: this.article.title + '-' + this.$store.state.user.nickname,
      meta: [
        { description: cutString(this.article.content, 300) }
      ]
    }
  },
  data() {
    return {
      options: {},
      isLogin: this.$store.state.token ? true : false
    }
  },

  mounted() {
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
  },

  methods: {
    del(id) {
      this.$store.dispatch('DELETE_ARTICLE', id).then(data => {
        if (data.success) {
          this.$refs.tip.openTip('文章已删除')
          this.$router.go(-1)
        }
      })
    },
    edit(id) {
      this.$router.push(`/admin/publish/${id}`)
    }
  }
}

</script>
<style lang="scss" scoped>
@import '~/assets/css/var.scss';

.detail {
  max-width: 700px;
  margin: 60px auto;
  .detail-title {
    margin-bottom: 15px;
  }
  .detail-meta {
    font-size: 14px;
    color: #999;
    margin-bottom: 30px;
    .meta-division {
      margin: 0 7px;
    }
  }
  .detail-tags {
    margin-top: 30px;
    a {
      font-size: 14px;
      color: #666;
      padding: 3px 10px;
      background-color: #eee;
      border-radius: 3px;
      margin-right: 15px;
      &:hover {
        background-color: darken(#eee, 5%);
      }
    }
  }
  .detail-copyright {
    font-size: 14px;
    color: #999;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .detail-admin {
    display: flex;
    justify-content: flex-end;
    border-top: 1px dashed #ccc;
    p {
      margin-top: 20px;
    }
    .admin-del {
      margin-right: 15px;
    }
  }
}

</style>

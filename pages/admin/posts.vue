<template>
  <div class="admin-posts">
    <input
      v-model="tmp.title"
      class="title"
      type="text"
      autofocus
    >

    <editor-edit
      v-model="tmp.content"
      :upload="upload"
      class="content"
      @save="handlePost(false)"
    />

    <div class="category">
      <span class="tip">分类: </span>
      <div
        v-for="(item, index) in categories"
        :key="index"
        class="item"
      >
        <input
          :id="item.id"
          v-model="tmp.category"
          :value="item.id"
          type="radio"
        >
        <label :for="item.id">
          <span v-if="!item.isShow">[私]</span>
          {{ item.title }}
        </label>
      </div>
    </div>

    <div class="state">
      <span class="tip">状态: </span>
      <div
        v-for="(item, index) in status"
        :key="index"
        class="item"
      >
        <input
          :id="item.value"
          v-model="tmp.status"
          :value="item.value"
          type="radio"
        >
        <label :for="item.value">{{ item.label }}</label>
      </div>
    </div>

    <div class="btns">
      <button @click="handlePost(false, true)">存草稿</button>
      <button
        class="primary"
        @click="handlePost(true, true)"
      >发布</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import debounce from 'lodash/debounce'
export default {
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      tmp: {},
      status: [
        {
          value: 1,
          label: '仅分类下显示',
        },
        {
          value: 2,
          label: '首页显示',
        },
        {
          value: 3,
          label: '置顶',
        },
      ],
    }
  },
  computed: {
    ...mapState([
      'domain',
      'token',
      'categories',
      'article',
    ]),
    upload() {
      return {
        url: `${this.domain}/upload`,
        headers: {
          Token: this.token,
        },
      }
    },
  },
  watch: {
    'tmp.content': debounce(function (newVal) {
      this.handlePost(false)
    }, 1000),

    '$route': function (newVal) {
      if (!newVal.query.id) {
        this.setDefault()
      }
    }
  },
  async mounted() {

    const id = this.$route.query.id
    if (id) {
      await this.getArticle(id)
      this.tmp = {
        ...this.article,
        category: this.article.category.id,
      }
    } else {
      this.setDefault()
    }
  },
  methods: {
    ...mapActions([
      'getArticle',
      'postArticle',
      'patchArticle',
    ]),
    async handlePost(state, isEnd) {
      if (!this.tmp.content || !this.tmp.title || !this.tmp.category) return

      this.tmp.isPublish = state

      if (this.tmp.id) {
        await this.patchArticle(this.tmp)

        // 点击了按钮
        if (isEnd) {
          this.$router.push(`/posts/${this.tmp.id}`)
          this.setDefault()
        }
      } else {
        const { data } = await this.postArticle(this.tmp)
        this.tmp = data
        this.$router.replace(`/admin/posts?id=${data.id}`)
      }
    },
    setDefault() {
      const def = this.categories.find(i => i.title === '默认分类').id
      this.tmp = {
        id: '',
        title: '',
        content: '',
        category: def,
        isPublish: false,
        status: 1,
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.admin-posts {
  .title {
    width: 100%;
    margin-bottom: 20px;
    font-size: 16px;
  }
  .content {
    margin-bottom: 20px;
  }
  .category,
  .state {
    color: #666;
    font-size: 14px;
    margin-bottom: 15px;
    .item {
      display: inline-block;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .tip {
      margin-right: 20px;
    }
  }
  .btns {
    margin-bottom: 100px;
    .primary {
      margin-left: 20px;
    }
  }
}
</style>

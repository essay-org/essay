<template>
  <div class="default container">
    <div class="left">
      <blog-nav />
      <section class="search">
        <input
          v-model="keywords"
          type="text"
          autofocus
          placeholder="文章搜索"
          @keyup.enter="handleSearch"
        >
      </section>
      <nuxt />
    </div>

    <aside class="right">
      <div class="about">
        <div class="intro">
          <img
            src="~/static/avatar.png"
            alt="avatar"
            class="avatar"
            width="100px"
          >

          <ul>
            <li>@{{ admin.nickname }}</li>
            <li>{{ admin.description }}</li>
          </ul>

        </div>
      </div>
      <div class="category">
        <h3>分类</h3>

        <ul>
          <li
            v-for="item in categoryByCut"
            :key="item.id"
          >
            <span v-if="!item.isShow">[私]</span>
            <nuxt-link :to="`/?category=${item.id}&page=1`">{{ item.title }} ({{ item.total }})</nuxt-link>
          </li>
          <li v-if="categories.length > count">
            <nuxt-link to="/category">全部分类 <span>&raquo;</span></nuxt-link>
          </li>
        </ul>
      </div>

      <div class="new">
        <h3>最新</h3>
        <ul>
          <li
            v-for="item in articlesNewCut"
            :key="item.id"
            class="dot"
          >
            <nuxt-link :to="`/posts/${item.id}`">{{ item.title }}</nuxt-link>
          </li>
        </ul>
      </div>

      <footer class="footer">
        Powerd by
        <a
          href="https://github.com/wmui/essay"
          target="_blank"
        >Essay</a>
      </footer>
    </aside>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      count: 10,
      keywords: '',
    }
  },
  head() {
    return {
      title: this.seo.title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.seo.keywords,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.seo.description,
        },
      ],
    }
  },
  computed: {
    ...mapState([
      'admin',
      'categories',
      'articlesNew',
      'seo',
    ]),
    categoryByCut() {
      return this.categories.slice(0, this.count)
    },
    articlesNewCut() {
      return this.articlesNew.slice(0, this.count)
    },
  },
  methods: {
    handleSearch() {
      if (!this.keywords) return
      this.$router.push(`/?keywords=${encodeURIComponent(this.keywords)}&page=1`)
    }
  },
}
</script>

<style lang="scss" scoped>
.default {
  display: flex;
  .left {
    box-sizing: border-box;
    overflow: hidden;
    flex: 1;
    padding: 15px;
    .search {
      margin-bottom: 20px;
      width: 300px;
    }
  }
  .right {
    width: 260px;
    padding: 15px;
    a {
      font-size: 14px;
    }
    h3 {
      margin-bottom: 15px;
    }
    li {
      list-style: none;
      line-height: 1.8;
    }
    .new,
    .about,
    .category {
      font-size: 14px;
      margin-bottom: 30px;
    }
    .intro img {
      border-radius: 3px;
    }
    .footer {
      color: #999;
      font-size: 12px;
      margin-bottom: 30px;
      a {
        color: $main-color;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .default {
    display: block;
  }
}
</style>


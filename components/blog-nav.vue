<template>
  <div class="blog-nav">
    <nav>
      <ul>
        <li
          v-for="item in navs"
          :key="item.index"
        >
          <nuxt-link :to="item.path">{{ item.name }}</nuxt-link>
        </li>
        <li v-if="type === 'admin'"><a @click="logout">退出</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'BlogNav',
  props: {
    type: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client',
    }
  },
  computed: {
    navs() {
      if (this.type === 'admin') {
        return [
          {
            name: '首页',
            path: '/',
          },
          {
            name: '分类',
            path: '/admin/category',
          },
          {
            name: '新随笔',
            path: '/admin/posts',
          },
          {
            name: '草稿',
            path: '/admin/draft',
          },
          {
            name: '评论',
            path: '/admin/comment',
          },
          {
            name: '设置',
            path: '/admin/setting',
          },
        ]
      }

      if (this.type === 'client') {
        return [
          {
            name: '首页',
            path: '/',
          },
          {
            name: '分类',
            path: '/category',
          },
          {
            name: '新随笔',
            path: '/admin/posts',
          },
        ]
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.replace('/')
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.blog-nav {
  .nuxt-link-exact-active {
    color: $main-color;
  }
  ul {
    margin-bottom: 20px;
  }
  li {
    list-style: none;
    display: inline-block;
    a {
      display: block;
      padding: 7px 15px;
      font-size: 16px;
    }
  }
}
</style>

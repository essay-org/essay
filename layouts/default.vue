<template>
  <div class="blog">
    <div class="header-wraper">
      <header class="blog-header">
        <h1 class="header-title"><a href="/">{{ $store.state.user.nickname }}</a></h1>
        <nav class="header-nav">
          <!-- admin navs -->
          <ul class="nav-list" v-if="/^(admin)/.test($route.name)">
            <li v-for="(nav, index) in adminNavs" :key="index" :class="{'nav-active': nav.routerName === $route.name}">
              <nuxt-link :to="nav.path">{{ nav.name }}</nuxt-link>
            </li>
            <li><a @click="logout">退出</a></li>
          </ul>
          <!-- front navs -->
          <ul class="nav-list" v-else>
            <li v-for="(nav, index) in navs" :key="index" :class="{'nav-active': nav.routerName === $route.name}">
              <nuxt-link :to="nav.path">{{ nav.name }}</nuxt-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <section class="blog-body">
      <nuxt/>
    </section>
    <aside class="blog-aside">
      <nuxt-link to="/rss.xml" target="_blank"><i class="iconfont icon-rss"></i></nuxt-link>
      <a href="https://github.com/wmui"><i class="iconfont icon-github"></i></a>
      <a href="/admin/publish"><i class="iconfont icon-writefill"></i></a>
      <a href="#"><i class="iconfont icon-backtop"></i></a>
    </aside>
    <footer class="blog-footer container">
      <p>Powered by <a href="https://github.com/wmui/vueblog" target="_blank">VueBlog</a>.</p>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: '',
      navs: [{
          path: '/',
          routerName: 'index',
          name: '首页'
        },
        {
          path: '/tags',
          routerName: 'tags-id',
          name: '标签'
        },
        {
          path: '/archives',
          routerName: 'archives',
          name: '归档'
        },
        {
          path: '/search',
          routerName: 'search-id',
          name: '搜索'
        }
      ],

      adminNavs: [{
          path: '/',
          routerName: 'index',
          name: '首页'
        }, {
          path: '/admin/private',
          routerName: 'admin-private',
          name: '草稿'
        },
        {
          path: '/admin/tags',
          routerName: 'admin-tags',
          name: '标签'
        },
        {
          path: '/admin/update',
          routerName: 'admin-update',
          name: '修改'
        }
      ]
    }
  },
  methods: {
    search() {
      if (this.keyword === '') {
        return
      } else {
        let keyword = encodeURIComponent(this.keyword)
        this.$router.push(`/search/${keyword}`)
      }
    },
    logout() {
      this.$store.dispatch('LOGOUT').then(data => {
        if (data.success) {
          this.$store.state.token = ''
          this.$router.push('/')
        }
      })
    }
  }
}

</script>
<style lang="scss">
@import '~/assets/css/var.scss';
.blog {
  position: relative;
  .header-wraper {
    width: 100%;
    border-bottom: 1px solid #eee;
    display: flex;
  }
  .blog-header {
    width: 960px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    line-height: 50px;
    .header-title {
      font-size: 20px;
      font-weight: 600;
      a:link,
      a:visited,
      a:hover,
      a:active {
        color: $font-color;
      }
    }
    .header-nav {
      ul {
        list-style: none;
      }
      li {
        display: inline-block;
        a {
          color: $font-color;
          padding: 0 15px;
          &:hover {
            color: $link-color;
          }
        }
        &.nav-active a {
          color: $link-color;
        }
      }
    }
  }
  .blog-body {
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 60px;
    margin-bottom: 60px;
  }
  .blog-aside {
    position: fixed;
    right: 30px;
    bottom: 50px;
    z-index: 999;
    // border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 0 0 3px  rgba(0, 0, 0, 0.3);
    a {
      display: block;
      color: #999;
      width: 40px;
      line-height: 40px;
      height: 40px;
      background-color: #fafafa;
      text-align: center;
      border: 1px solid #fff;
      opacity: 1;
      border-bottom: 1px solid #eee;
      &:hover {
        color: $link-color;
      }
    }
    i {
      font-size: 25px;
    }
  }
  .blog-footer {
    border-top: 1px solid #eee;
    text-align: center;
    font-size: 12px;
    p {
      line-height: 50px;
      color: #999;
    }
    a {
      color: $link-color;
    }
  }
}

</style>

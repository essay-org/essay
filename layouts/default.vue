<template>
  <div class="blog">
    <div class="header-wraper">
      <header class="blog-header">
        <h1 class="header-title"><a href="/">{{ $store.state.user.nickname }}</a></h1>
          <nav class="header-nav" ref="headerNav">
            <div class="nav-avatar">
              <img :src="$store.state.user.avatar" alt="">
              <h4>{{ $store.state.user.motto }}</h4>
            </div>
            <div class="nav-search">
              <i class="vueblog icon-search"></i>
              <input type="text" v-model="keyword" @keyup.enter="search" maxlength="30">
            </div>
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
        <div class="header-menu" @click="showMenu">
          <i class="vueblog icon-menu"></i>
        </div>
      </header>
    </div>
    <section class="blog-body">
      <nuxt/>
    </section>
    <aside class="blog-aside">
      <nuxt-link to="/rss.xml" target="_blank"><i class="vueblog icon-rss"></i></nuxt-link>
      <a href="https://github.com/wmui"><i class="vueblog icon-github"></i></a>
      <a href="/admin/publish"><i class="vueblog icon-writefill"></i></a>
      <a @click="backTop"><i class="vueblog icon-backtop"></i></a>
    </aside>
    <footer class="blog-footer container">
      <p>Powered by <a href="https://github.com/wmui/vueblog" target="_blank">VueBlog</a></p>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: '',
      navStyle: {},
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
        }
      ],

      adminNavs: [
        {
          path: '/admin/private',
          routerName: 'admin-private',
          name: '草稿'
        },
        {
          path: '/admin/comment',
          routerName: 'admin-comment',
          name: '评论'
        },
        {
          path: '/admin/tags',
          routerName: 'admin-tags',
          name: '标签'
        },
        {
          path: '/admin/update',
          routerName: 'admin-update',
          name: '设置'
        }
      ]
    }
  },
  methods: {
    search() {
      let keyword = encodeURIComponent(this.keyword)
      if (!keyword) { return false }
      this.$router.push({
        name: 'search-id',
        params: {
          id: keyword
        }
      })
    },
    logout() {
      this.$store.dispatch('LOGOUT').then(data => {
        if (data.success) {
          this.$store.state.token = ''
          this.$router.push('/')
        }
      })
    },
    backTop() {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    },
    showMenu() {
      if(this.$refs.headerNav.style.transform) {
        this.$refs.headerNav.style.transform = ''
      } else {
        this.$refs.headerNav.style.transform = 'translateX(0)'
      }
    }
  }
}

</script>
<style lang="scss">
@import '~/assets/css/var.scss';
.blog {
  position: relative;
  .header-wraper {
    position: fixed;
    top: 0;
    display: flex;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    z-index: 9;
    background-color: #fff;
  }
  .blog-header {
    display: flex;
    width: 960px;
    margin: 0 auto;
    justify-content: space-between;
    padding: 0 15px;
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
    .nav-search {
      display: inline-block;
      position: relative;
      .icon-search {
        position: absolute;
        left: 10px;
        font-size: 20px;
        color: #ddd;
      }
      input[type="text"] {
        height: 35px;
        width: 200px;
        line-height: 35px;
        text-indent: 2em;
        border-radius: 35px;
        &:focus {
          outline: none;
          border-color: $link-color;
        }
      }
    }
    .header-nav {
      .nav-avatar {
        display: none;
      }
      ul {
        display: inline-block;
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
    .header-menu {
      display: none;
      height: 50px;
      line-height: 50px;
      .icon-menu {
        font-size: 20px;
        font-weight: lighter;
      }
    }
  }
  .blog-body {
    position: relative;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 50px;
    margin-top: 100px;
  }
  .blog-aside {
    position: fixed;
    right: 30px;
    bottom: 30px;
    z-index: 999;
    border-radius: 4px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
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

@media screen and(max-width: 768px) {
  .blog {
    .blog-header {
      .header-menu {
        display: inline-block;
      }
      .header-nav {
        transform: translateX(100%);
        transition: transform .2s ease;
        position: fixed;
        right: 0;
        height: 100%;
        margin-top: 50px;
        text-align: center;
        overflow: auto;
        padding: 0 15px;
        z-index: 1000;
        background-color: #f3f3f3;
        .nav-avatar {
          display: block;
          img {
            width: 100px;
            border-radius: 50%;
            text-align: center;
            display: inline-block;
            margin-top: 30px;
          }
        }
        .nav-search {
          display: block;
          width: 200px;
        }
        .nav-list {
          width: 100%;
          li {
            display: block;
            border-bottom: 1px solid #ddd;
          }
        }
      }
    }
    .blog-aside {
      display: none;
    }
  }
}
</style>

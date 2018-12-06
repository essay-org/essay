<template>
  <div class="blog">
    <div class="header-wraper">
      <header class="blog-header">
        <div 
          class="header-back" 
          v-if="$route.params.id" 
          @click="$router.go(-1)">
          <i class="wmui icon-back"></i>
        </div>
        <h1 class="header-title" v-else>
          <nuxt-link to="/">{{ $store.state.user.nickname }}</nuxt-link>
        </h1>
        <nav class="header-nav">
          <div class="nav-search">
            <i class="wmui icon-search"></i>
            <input
              type="text"
              v-model="keyword"
              @keyup.enter="search"
              maxlength="30">
          </div>
          <ul class="nav-list" v-if="/^admin/.test(this.$route.name)">
            <li
              v-for="(nav, index) in adminNavs"
              :key="index"
              >
              <nuxt-link :to="nav.path">{{ nav.name }}</nuxt-link>
            </li>
          </ul>
          <ul class="nav-list" v-else>
            <li
              v-for="(nav, index) in navs"
              :key="index"
              >
              <nuxt-link :to="nav.path">{{ nav.name }}</nuxt-link>
            </li>
          </ul>
        </nav>
        <div class="header-search" @click="$router.push('/search')">
          <i class="wmui icon-search"></i>
        </div>
      </header>
    </div>
    <section class="blog-body">
      <nuxt/>
    </section>
    <aside class="blog-aside">
      <nuxt-link to="/rss.xml" target="_blank">
        <i class="wmui icon-rss"></i>
      </nuxt-link>
      <a href="https://github.com/wmui">
        <i class="wmui icon-github"></i>
      </a>
      <a @click="backTop">
        <i class="wmui icon-backtop"></i>
      </a>
    </aside>
    <footer class="blog-footer">
      <p>Powered by <a href="https://github.com/wmui/essay" target="_blank">Essay</a></p>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: '',
      navs: [
        {
          path: '/tags',
          name: '标签',
        },
        {
          path: '/admin/posts',
          name: '新随笔',
        },
      ],
      adminNavs:[
        {
          path: '/admin/settings',
          name: '设置',
        },
        {
          path: '/admin/comments',
          name: '评论',
        },
        {
          path: '/admin/tags',
          name: '标签',
        },
        {
          path: '/admin/drafts',
          name: '草稿',
        },
        {
          path: '/admin/posts',
          name: '随笔',
        },
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
    backTop() {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    },
  }
}

</script>
<style lang="scss">
@import '~/assets/styles/var.scss';
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
    z-index: 999;
    background-color: #fff;
  }
  .blog-header {
    display: flex;
    width: 960px;
    margin: 0 auto;
    justify-content: space-between;
    padding: 0 15px;
    .header-title{
      font-size: 20px;
      font-weight: bold;
      a:link,
      a:visited,
      a:hover,
      a:active {
        color: $font-color;
      }
    }
    .header-back {
      width: 50px;
      cursor: pointer;
      .icon-back {
       font-size: 25px;
      }
    }
    .nav-search {
      display: inline-block;
      position: relative;
      margin-right: 15px;
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
        text-indent: 2rem;
        border-radius: 35px;
        &:focus {
          outline: none;
          border-color: $link-color;
        }
      }
    }
    .header-nav {
      display: flex;
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
      }
      .nuxt-link-active{
        color: $link-color;
      }
    }
    .header-search {
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
    max-width: 770px;
    margin: 100px auto 50px;
    position: relative;
    padding-left: 15px;
    padding-right: 15px;
  }
  .blog-aside {
    position: fixed;
    right: 30px;
    bottom: 50px;
    border: 1px solid #eee;
    border-bottom: none;
    background: #eee;
    a {
    display: block;
    color: #999;
    width: 45px;
    line-height: 45px;
    height: 45px;
    background-color: #fff;
    text-align: center;
    border-bottom: 1px solid #eee;
      &:hover {
        background: #f3f3f3;
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
    max-width: 770px;
    margin-left: auto;
    margin-right: auto;
    p {
      line-height: 50px;
      color: #999;
    }
    a {
      color: $link-color;
    }
  }
}
.wmui-edit.full-screen {
  z-index: 1000 !important;
}
@media screen and(max-width: 770px) {
  .blog {
    .blog-header {
      .nav-search {
        display: none;
      }
      .header-search {
        display: inline-block;
        width: 50px;
        text-align: right;
        cursor: pointer;
      }
      .header-nav li a{
        padding: 0 7px;
      }
    }
    .blog-aside {
      display: none;
    }
  }
}

</style>

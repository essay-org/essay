<template>
  <nav class="nav">
    <!-- admin navs -->
    <ul class="nav-list" v-if="/^(admin)/.test($route.name)">
      <li v-for="(nav, index) in adminNavs" :key="index">
        <nuxt-link :to="nav.path" :class="{'active': nav.routerName === $route.name}">{{ nav.name }}</nuxt-link>
      </li>
      <li><a @click="logout">退出</a></li>
    </ul>
    <!-- front navs -->
    <ul class="nav-list" v-else>
      <li v-for="(nav, index) in navs" :key="index">
        <nuxt-link :to="nav.path" :class="{'active': nav.routerName === $route.name}">{{ nav.name }}</nuxt-link>
      </li>
    </ul>
    <div class="nav-search">
      <input type="search" placeholder="回车搜索" @keyup.enter="search" v-model="keyword">
    </div>
  </nav>
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
          path: '/admin/publish',
          routerName: 'admin-publish-id',
          name: '新随笔'
        },
        {
          path: '/about',
          routerName: 'about',
          name: '关于'
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
        },
        {
          path: '/admin/publish',
          routerName: 'admin-publish-id',
          name: '新随笔'
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
<style lang="postcss">
.nav {
  height: 50px;
  background-color: #33363b;
  border: 1px solid #3d4045;
  border-bottom: none;
  display: flex;
  justify-content: space-between;
  & .nav-list {
    display: flex;
    padding: 0 15px;
    & li {
      list-style-type: none;
    }
    & li a {
      display: block;
      color: #c8c9ca;
      padding: 13px;
    }
    & li:nth-child(1) a {
      padding-left: 0;
    }
    & a.active {
      color: #fff;
    }
  }
  & .nav-search {
    line-height: 50px;
    margin-right: 15px;
    & input {
      width: 200px;
      border: none;
      background-color: #404448;
      color: #999;
    }
  }
}

</style>

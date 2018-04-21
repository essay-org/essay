<template>
  <div>
    <template v-if="hasID">
      <top-lists :articles="articles"/>
    </template>
    <template v-else>
      <div class="search">
        <h3>文章搜索</h3>
        <label>
          <input type="text" v-model="keyword" @keyup.enter="search" autofocus placeholder="回车搜索">
        </label>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  async asyncData({ store, route }) {
    let id = route.params.id || ''
    let data = await store.dispatch('SEARCH', id)
    if (route.params.id) {
      // articles
      if (data.success) {
        return {
          hasID: true,
          articles: data.data
        }
      }
    } else {
      if (data.success) {
        return {
          hasID: false,
          articles: []
        }
      }
    }
  },
  head () {
    return {
      title: '搜索 - ' + this.$store.state.user.nickname
    }
  },
  data() {
    return {
      keyword: ''
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
    }
  }
}

</script>
<style lang="scss" scoped>
@import '~/assets/css/var.scss';
.search {
  text-align: center;
  margin: 60px auto;
  h3 {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 30px;
  }
  label {
    display: block;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  input {
    width: 100%;
  }
}
</style>

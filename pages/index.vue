<template>
  <div class="index container" v-scroll="onLoad">
    <top-list :articles="$store.state.articles" />
    <p v-if="isLoading" class="load-tip">加载中...</p>
    <p v-if="noMore" class="load-tip">没有更多文章了</p>
  </div>
</template>
<script>
export default {
  async fetch({ store, route }) {
    if (!store.state.articles.length) {
      await store.dispatch('ARTICLES', 1)
    }
  },
  data() {
    return {
      page: 1,
      isLoading: false,
      noMore: false
    }
  },
  head() {
    return {
      title: this.$store.state.user.nickname
    }
  },
  directives: {
    scroll: {
      bind(el, binding) {
        window.addEventListener('scroll', () => {
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          if (scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            let onLoad = binding.value
            onLoad()
          }
        }, false)
      }
    }
  },
  methods: {
    async onLoad() {
      // 没有正在加载中
      if(!this.isLoading) {
        if(this.$store.state.articles.length < this.$store.state.total) {
          this.isLoading = true
          this.page++
          await this.$store.dispatch('ARTICLES', this.page)
          this.isLoading = false
        }else{
          this.noMore = true
          return false
        }
      }else{
        return false
      }
    }
  }
}

</script>

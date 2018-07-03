<template>
  <div class="tags container">
    <template v-if="$route.params.id">
      <top-list :articles="lists"/>
    </template>
    <template v-else>
      <ul class="tags-list">
        <li class="tag" v-for="(tag, index) in lists" :key="index">
          <nuxt-link :to="'/tags/'+ tag.id">{{ tag.name }}</nuxt-link>
        </li>
      </ul>
    </template>
  </div>
</template>
<script>
export default {
  async asyncData({ store, route }) {
    let id = route.params.id || ''
    const { data } = await store.dispatch('TAGS', id)
    return {
      lists: data || []
    }
  },
  head() {
    return {
      title: '标签 - ' + this.$store.state.user.nickname
    }
  }
}

</script>
<style lang="scss" scoped>
@import '~/assets/css/var.scss';
.tags-list {
  li {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    a {
      color: #666;
      padding: 3px 10px;
      background-color: #eee;
      border-radius: 3px;
      &:hover {
        background-color: darken(#eee, 5%);
      }
    }
  }
}
</style>

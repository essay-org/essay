<template>
  <div class="tags">
    <template v-if="hasID">
      <top-lists :articles="articles"/>
    </template>
    <template v-else>
      <ul class="tags-list">
        <li class="tag" v-for="(tag, index) in tags" :key="index">
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
    let data = await store.dispatch('TAGS', id)
    if (route.params.id) {
      // articles
       if (data.success) {
        return {
          hasID: true,
          articles: data.data,
          tags: []
        }
      }
    } else {
      // tags
      if (data.success) {
        return {
          hasID: false,
          tags: data.data,
          articles: []
        }
      }
    }
  },
  head () {
    return {
      title: '标签 - ' + this.$store.state.user.nickname
    }
  }
}

</script>
<style lang="scss" scoped>
@import '~/assets/css/var.scss';
.tags-list {
  max-width: 700px;
  margin: 60px auto;
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

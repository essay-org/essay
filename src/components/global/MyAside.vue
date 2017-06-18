<template>
  <aside class="aside">
    <div class="tags">
      <div class="title">标签</div>
      <div class="tag">
        <ul>
          <li v-for="(item,index) in tag" :key="index">
            <a @click="link(item)">{{item}}</a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  name: 'aside',
  computed: {
    tag() {
      return this.$store.state.tag
    }
  },
  methods: {
    link(item) {
      this.$router.push({
        name: 'categoryTag',
        params: {
          tag: item
        }
      })
    }
  }
}
</script>

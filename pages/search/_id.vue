<template>
    <div class="search container">
        <base-list :query="{keywords: encodeURIComponent($route.params.id)}"></base-list>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'Search',
    async fetch({ store, route }) {
        const { article } = store.state
        store.commit('article/setArticlesNull')
        const keywords = encodeURIComponent(route.params.id)
        await store.dispatch('article/getArticles', { keywords, page: 1 })
    },
    head() {
        return {
            title: `${this.$route.params.id} - ${this.siteName}`,
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.name !== 'posts-id') {
            this.$store.commit('article/setArticlesNull')
        }
        next()
    },
    computed: {
        ...mapState('article', ['total']),
        ...mapState('global', ['siteName']),
    },
}
</script>

<template>
    <div class="index container">
        <base-list></base-list>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'Index',
    async fetch({ store, route }) {
        const { article } = store.state
        if (article.articles.length === 0) {
            await store.dispatch('article/getArticles', { page: 1 })
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.name !== 'posts-id') {
            this.$store.commit('article/setArticlesNull')
        }
        next()
    },
}
</script>
<style lang="less">
.index {
    .article {
        margin-top: 30px;
        margin-bottom: 30px;
        .main {
            .content {
                margin-bottom: 15px;
            }
            .title {
                font-size: 14px;
                margin-bottom: 15px;
                text-align: right;
            }
        }
    }
}
</style>

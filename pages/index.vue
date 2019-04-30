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
        store.commit('article/setArticlesNull')
        await Promise.all([
            store.dispatch('article/getArticles', { page: 1 }),
            store.dispatch('article/getArticlesTop'),
        ])
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit('article/setArticlesTopNull')
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

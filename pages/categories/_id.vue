<template>
    <div class="categories-id container">
        <base-list :query="query"></base-list>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'CategoriesId',
    async fetch({ store, route, error }) {
        const { article } = store.state
        store.commit('article/setArticlesNull')
        await Promise.all([
            store.dispatch('article/getArticles', { categoryId: route.params.id, page: 1 }).catch(err => error({ statusCode: 404 })),
            store.dispatch('category/getCategory', route.params.id).catch((err) => {
                error({ statusCode: 404 })
            }),
            store.dispatch('article/getArticlesTop', route.params.id).catch((err) => {
                error({ statusCode: 404 })
            }),
        ])
    },
    head() {
        return {
            title: `${this.category.name} - ${this.siteName}`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.category.keywords || this.seo.keywords,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.category.description || this.seo.description,
                },
            ],
        }
    },
    data() {
        return {
            query: {
                categoryId: this.$route.params.id,
            },
        }
    },
    computed: {
        ...mapState('category', ['category']),
        ...mapState('global', ['seo', 'siteName']),
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit('article/setArticlesTopNull')
        next()
    },
}
</script>

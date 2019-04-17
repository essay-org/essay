<template>
    <div class="tags-id container">
        <base-list :query="query"></base-list>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'TagsId',
    async fetch({ store, route, error }) {
        const { article } = store.state
        store.commit('article/setArticlesNull')
        await Promise.all([
            store.dispatch('article/getArticles', { tagId: route.params.id, page: 1 }).catch((err) => {
                error({ statusCode: 404 })
            }),
            store.dispatch('tag/getTags', route.params.id).catch((err) => {
                error({ statusCode: 404 })
            })])
    },
    head() {
        return {
            title: `${this.tagName} - ${this.siteName}`,
        }
    },
    data() {
        return {
            query: {
                tagId: this.$route.params.id,
            },
        }
    },
    computed: {
        ...mapState('tag', [
            'tags',
        ]),
        ...mapState('global', ['siteName']),
        tagName() {
            const tag = this.tags.find(i => i.id === this.$route.params.id)
            return tag ? tag.name : '标签'
        },
    },
}
</script>

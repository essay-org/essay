<template>
    <div class="admin-drafts container-admin">
        <base-list
            :query="query"
            :is-draft="true"
        ></base-list>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'AdminDrafts',
    layout: 'admin',
    middleware: 'admin',
    computed: {
        ...mapState('global', ['siteName']),
        ...mapState('user', ['user']),
        ...mapState('article', ['articles']),
        query() {
            return {
                page: 1,
                userId: this.user.id,
            }
        },
    },
    methods: {
        ...mapActions('article', ['getDrafts']),
        ...mapMutations('article', ['setArticlesNull']),
    },
    beforeRouteLeave(to, from, next) {
        if (to.name !== 'posts-id') {
            this.$store.commit('article/setArticlesNull')
        }
        next()
    },
    mounted() {
        if (this.articles.length === 0) {
            this.getDrafts(this.query)
        }
    },
}
</script>

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
    mounted() {
        this.setArticlesNull()
        this.getDrafts(this.query)
    },
}
</script>

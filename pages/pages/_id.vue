<template>
    <div class="pages container">
        <base-editor-preview :content="page.description"></base-editor-preview>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { cutString } from '~/plugins/filters'

export default {
    name: 'Pages',
    async fetch({ store, route }) {
        await store.dispatch('page/getPage', route.params.id)
    },
    head() {
        return {
            title: `${this.page.name} - ${this.siteName}`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.page.name,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: cutString(this.page.description, 60),
                },
            ],
        }
    },
    computed: {
        ...mapState('page', ['page']),
        ...mapState('global', ['siteName']),
    },
}
</script>

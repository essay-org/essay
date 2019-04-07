<template>
    <div class="categories-index container">
        <div
            v-for="item in categories"
            :key="item.id"
            class="item"
        >
            <nuxt-link :to="`/categories/${item.id}`">{{ item.name }}（{{ item.total }}）</nuxt-link>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'Categories',
    async fetch({
        store, route, req, res,
    }) {
        const { category } = store.state
        if (category.categories.length === 0) {
            await store.dispatch('category/getCategories')
        }
    },
    head() {
        return {
            title: `分类列表 - ${this.siteName}`,
        }
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit('article/setArticlesNull')
        next()
    },
    computed: {
        ...mapState('category', [
            'categories',
        ]),
        ...mapState('global', ['siteName']),
    },
}
</script>
<style lang="less">
.categories-index {
    .item {
        margin-bottom: 10px;
        margin-right: 10px;
        display: inline-block;
        a {
            color: #666;
            &:hover {
                color: #64b888;
            }
        }
    }
}
</style>

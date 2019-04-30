<template>
    <div class="tags-index container">
        <ul>
            <li
                class="tag"
                v-for="(tag, index) in tags"
                :key="index"
            >
                <nuxt-link :to="'/tags/'+ tag.id">{{ tag.name }} ({{ tag.total }})</nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'TagsIndex',
    async fetch({ store }) {
        await store.dispatch('tag/getTags')
    },
    head() {
        return {
            title: `标签列表 - ${this.siteName}`,
        }
    },
    computed: {
        ...mapState('tag', ['tags']),
        ...mapState('global', ['siteName']),
    },
}
</script>
<style lang="less">
.tags-index {
    li {
        display: inline-block;
        a {
            color: #666;
            display: block;
            padding: 5px 15px;
            background-color: #eee;
            border-radius: 3px;
            margin-bottom: 10px;
            margin-right: 10px;
            &:hover {
                background-color: darken(#eee, 3%);
            }
        }
    }
}
</style>

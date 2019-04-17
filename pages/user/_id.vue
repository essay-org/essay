<template>
    <div class="user container">
        <i-card dis-hover>
            <div class="user__info flex">
                <div class="info_avatar">
                    <img
                        :src="otherUser.avatar"
                        alt="avatar"
                    >
                </div>
                <div class="info_info">
                    <h3 class="one">{{otherUser.username}}</h3>
                    <p class="two">{{otherUser.description}}</p>
                </div>
            </div>
        </i-card>
        <i-card
            class="mt15"
            dis-hover
        >
            <p slot="title">喜欢的文章</p>
            <div class="user__data">
                <base-list :query="query"></base-list>
            </div>
        </i-card>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'User',
    async fetch({ store, route, error }) {
        const { article } = store.state
        store.commit('article/setArticlesNull')
        await Promise.all([
            store.dispatch('article/getArticles', { likeId: route.params.id, page: 1 }).catch(err => error({ statusCode: 404 })),
            store.dispatch('user/getOtherUser', route.params.id).catch(err => error({ statusCode: 404 })),
        ])
    },
    head() {
        return {
            title: `${this.otherUser.username} - ${this.siteName}`,
        }
    },
    data() {
        return {
            query: { likeId: this.$route.params.id, page: 1 },
        }
    },
    computed: {
        ...mapState('user', ['otherUser']),
        ...mapState('global', ['siteName']),
    },
}
</script>

<style lang="less">
.user {
    &__info {
        margin-bottom: 20px;
    }
    .info_avatar img {
        width: 70px;
        height: 70px;
        border-radius: 10px;
        margin-right: 30px;
    }
    .info_info {
        flex: 1;
        .two,
        .three {
            color: #666;
            margin-top: 5px;
        }
    }
}
</style>

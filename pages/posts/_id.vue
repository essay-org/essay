<template>
    <div class="posts container">
        <h2 class="posts-title">{{ article.title }}</h2>
        <base-editor-preview :content="article.content"></base-editor-preview>
        <p
            class="posts-tags"
            v-if="article.tags.length"
        >
            <nuxt-link
                class="tags"
                v-for="(tag, index) in article.tags"
                :key="index"
                :to="`/tags/${tag.id}`"
            ># {{ tag.name }}</nuxt-link>
        </p>
        <div class="posts-admin">
            <p>
                发布于{{ $Moment(article.createdAt).format('YYYY年MM月DD日') }}
            </p>
            <p> 更新于{{ $Moment(article.updatedAt).format('YYYY年MM月DD日') }}</p>
            <p> 浏览{{ article.views }}次</p>
            <p><nuxt-link
                    :to="`/categories/${article.category.id}`"
                    v-if="article.category.name"
                >{{ article.category.name }}</nuxt-link></p>
            <p><a @click="handleLike">{{ likeText }}</a></p>
            <div
                class="admin-edit"
                v-if="isAdmin"
            >
                <i-poptip
                    confirm
                    title="确定要删除吗"
                    @on-ok="handleDelete"
                >
                    <a>删除</a>
                </i-poptip>
                <a @click="handleEdit">编辑</a>
            </div>
        </div>
        <base-comment
            v-if="article.enableComment && isConfigGithub"
            ref="comment"
        ></base-comment>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { cutString } from '~/plugins/filters'

export default {
    name: 'Posts',
    async fetch({
        store, route, req, res, error,
    }) {
        await store.dispatch('article/getArticle', route.params.id).catch(err => error({ statusCode: 404 }))
    },

    head() {
        return {
            title: `${this.article.title} - ${this.siteName}`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.article.tags.map(i => i.name).join('，'),
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.article.abstract || cutString(this.article.content, 60),
                },
            ],
        }
    },
    computed: {
        ...mapState('article', ['article']),
        ...mapState('comment', ['comments']),
        ...mapState('user', ['user']),
        ...mapState('global', ['siteName', 'isConfigGithub']),
        isAdmin() {
            return this.user.role === 'superAdmin'
        },
        likeText() {
            const isLike = this.article.likes.includes(this.user.id)
            return isLike
                ? `取消喜欢 ${this.article.likes.length}`
                : `喜欢 ${this.article.likes.length}`
        },
    },
    methods: {
        ...mapActions('article', ['patchArticleLikes', 'getArticle', 'deleteArticle']),
        ...mapMutations('article', ['setArticlesNull']),
        handleEdit() {
            this.$router.push(`/admin/posts/${this.article.id}`)
        },
        async handleDelete() {
            await this.deleteArticle(this.article.id)
            this.setArticlesNull()
            this.$router.go(-1)
        },
        async handleLike() {
            if (!this.user.id) {
                this.$refs.comment.handleLogin()
                return
            }
            await this.patchArticleLikes(this.article.id)
            await this.getArticle(this.article.id)
        },
    },
}
</script>
<style lang="less">
.posts {
    margin-bottom: 60px;
    .editor-preview {
        padding: 0 !important;
    }
    .posts-title {
        padding-bottom: 20px;
    }
    .posts-tags {
        margin: 30px 0 15px;
        a {
            font-size: 14px;
            color: #666;
            padding: 7px 10px;
            background-color: #eee;
            border-radius: 3px;
            margin-right: 15px;

            &:hover {
                background-color: darken(#eee, 5%);
            }
        }
    }
    .posts-admin {
        font-size: 14px;
        color: #999;
        margin: 20px 0;
        p {
            display: inline-block;
            margin-right: 15px;
        }
        .admin-edit {
            display: inline-block;
        }
    }
}
</style>

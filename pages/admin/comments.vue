<template>
    <div class="admin-comments container-admin">
        <i-table
            :data="comments"
            :columns="columns"
        >
            <template
                slot="user"
                slot-scope="{row}"
            >
                <p>
                    <nuxt-link :to="`/user/${row.user.id}`">{{row.user.username}}</nuxt-link>
                </p>
            </template>
            <template
                slot="content"
                slot-scope="{row}"
            >
                <p v-if="row.reply && row.reply.id">
                    <nuxt-link :to="`/user/${row.reply.user.id}`">@{{row.reply.user.username}}:</nuxt-link>
                    {{ row.reply.content}}
                </p>
                <p v-else>{{row.content}}</p>
            </template>
            <template
                slot="title"
                slot-scope="{row}"
            >
                <nuxt-link :to="`/posts/${row.article.id}`">{{ row.article.title}}</nuxt-link>
            </template>
            <template
                slot="operator"
                slot-scope="{row}"
            >
                <i-button
                    size="small"
                    @click="handleDelete(row)"
                    style="margin-right: 15px"
                    :disabled="isDisabled(row)"
                >删除</i-button>
            </template>
        </i-table>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'AdminComments',
    layout: 'admin',
    middleware: 'admin',
    data() {
        return {
            columns: [
                {
                    title: '评论内容',
                    minWidth: 200,
                    slot: 'content',
                },
                {
                    title: '评论者',
                    minWidth: 150,
                    slot: 'user',
                },
                {
                    title: '所属文章',
                    minWidth: 150,
                    ellipsis: true,
                    slot: 'title',
                },
                {
                    title: '操作',
                    minWidth: 100,
                    slot: 'operator',
                },
            ],
        }
    },
    methods: {
        ...mapActions('comment', [
            'getComments',
            'deleteComment',
        ]),
        async handleDelete(row) {
            await this.deleteComment(row.id)
            this.getComments()
        },
        isDisabled(row) {
            const isReply = !!(row.reply && row.reply.id)
            return isReply ? row.reply.isInvalid : row.isInvalid
        },
    },
    computed: {
        ...mapState('comment', [
            'comments',
        ]),
    },
    mounted() {
        this.getComments()
    },
}
</script>

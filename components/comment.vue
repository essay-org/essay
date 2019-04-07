<template>
    <div class="comment">
        <i-spin size="large" fix v-if="spinShow"></i-spin>
        <template v-if="comments.length">
            <div
                class="comment__item"
                v-for="item in comments"
                :key="item.id"
            >
                <div class="item__left">
                    <img
                        :src="item.user.avatar"
                        :alt="item.user.username"
                    >
                </div>
                <div class="item__right">
                    <div class="right_title">
                        <p class="one">
                            <a :href="`https://github.com/${item.user.username}`" target="_blank">{{item.user.username}}</a>
                            <span
                                @click="handleReply(item.id, item.user)"
                                v-if="item.user.username !== user.username"
                            >回复</span>
                        </p>
                        <p class="two">{{ $Moment(item.createdAt).format('YYYY年MM月DD日') }}</p>
                    </div>
                    <div
                        class="right_reply"
                        v-if="item.reply.id"
                    >
                        <p>回复 <a>{{item.reply.user.username}}</a>: <span :class="[{right_invalid: item.reply.isInvalid }]">{{item.reply.content}}</span></p>
                    </div>
                    <p :class="['right_content', {right_invalid: item.isInvalid }]">{{ item.content }}</p>
                </div>
            </div>
        </template>
        <div
            class="comment__item"
            v-if="user && user.id"
        >
            <div class="item__left">
                <img
                    :src="user.avatar"
                    :alt="user.username"
                >
            </div>
            <div class="item__right">
                <i-input
                    type="textarea"
                    v-model="commentTmp.content"
                    :maxlength="300"
                    :placeholder="placeholder"
                    ref="reply"
                />
                <i-button
                    size="small"
                    type="primary"
                    style="float: right; margin-top: 10px"
                    @click="handlePost"
                >提交留言</i-button>
            </div>
        </div>
        <div class="comment__item comment__github" v-else>
            <i-button type="primary" size="default" @click="handleLogin">GitHub登录</i-button>
            <p>欢迎留言交流</p>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'BaseComment',
    data() {
        return {
            commentTmp: {},
            placeholder: '',
            spinShow: false,
            id: this.$route.params.id || '',
            toUser: '',
            toUserEmail: '',
        }
    },
    mounted() {
        this.setDefault()
        this.getCommentsById(this.id)
    },
    computed: {
        ...mapState('global', [
            'domain',
            'token',
        ]),
        ...mapState('comment', [
            'comments',
        ]),
        ...mapState('user', ['user']),
    },
    methods: {
        ...mapActions('comment', [
            'postComment',
            'getCommentsById',
        ]),
        ...mapActions('tool', [
            'postEmail',
        ]),
        setDefault() {
            this.commentTmp = {
                id: this.id,
                reply: '',
                content: '',
            }
            this.placeholder = ''
        },
        async handlePost() {
            await this.postComment(this.commentTmp)
            this.getCommentsById(this.id)


            // 评论接收人发邮件
            if (this.commentTmp.reply) {
                await this.postEmail({
                    fromUser: this.user.username,
                    toUser: this.toUser,
                    toUserEmail: this.toUserEmail,
                    content: this.commentTmp.content,
                    id: this.id,
                })
            }

            this.setDefault()
        },
        handleReply(id, user) {
            this.commentTmp.reply = id
            this.$refs.reply.focus()
            this.toUser = user.username
            this.toUserEmail = user.email
            this.placeholder = `回复${user.username}:`
        },
        handleLogin() {
            // window.open(`${this.domain}/api/oauth/github/${this.id}`)
            this.spinShow = true
            window.location.href = `${this.domain}/api/oauth/github/${this.id}`
        },
    },
}
</script>

<style lang="less">
.comment {
    &__item {
        background: #f3f3f3;
        font-size: 14px;
        padding: 15px 10px;
        display: flex;
        .item__left img {
            width: 30px;
            height: 30px;
            border-radius: 15px;
            margin-right: 15px;
        }
        .item__right {
            flex: 1;
            .right_title {
                color: #999;
                font-size: 14px;
                margin-bottom: 7px;
                .one {
                    display: flex;
                    justify-content: space-between;
                    line-height: 1;
                    span {
                        cursor: pointer;
                    }
                }
            }
            .right_content {
                margin-bottom: 15px;
            }
            .right_reply {
                border-left: 3px solid #ccc;
                margin-bottom: 10px;
                p {
                    margin-left: 10px;
                }
            }
            .right_invalid {
                color: #999;
            }
        }
    }
    &__github {
        display: block;
        margin-top: 10px;
        button {
            display: block;
            margin: 0 auto;
        }
        p {
            text-align: center;
            color: #999;
            margin-top: 10px;
        }
    }
}
</style>

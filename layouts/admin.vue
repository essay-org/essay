<template>
    <div class="admin">
        <div class="admin__nav">
            <i-menu
                :active-name="currentNav"
                theme="dark"
                width="auto"
                mode="horizontal"
            >
                <i-menu-item
                    :name="item.name"
                    v-for="(item,index) in navs"
                    :key="index"
                    @click.native="go(item.name)"
                >
                    <i-icon :type="item.icon"></i-icon>
                    <span>{{ item.text }}</span>
                </i-menu-item>
                <i-menu-item
                    name="log-out"
                    @click.native="handleLogout"
                >
                    <span>退出</span>
                </i-menu-item>
            </i-menu>
        </div>
        <nuxt />
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Admin',
    head() {
        return {
            title: '管理后台',
        }
    },
    data() {
        return {
            navs: [
                {
                    text: '首页',
                    name: 'admin',
                },
                {
                    text: '新随笔',
                    name: 'admin-posts-id',
                },
                {
                    text: '草稿箱',
                    name: 'admin-drafts',
                },
                {
                    text: '标签',
                    name: 'admin-tags',
                },
                {
                    text: '分类',
                    name: 'admin-categories',
                },
                {
                    text: '单页',
                    name: 'admin-pages',
                },
                {
                    text: '用户',
                    name: 'admin-users',
                },
                {
                    text: '评论',
                    name: 'admin-comments',
                },
                // {
                //     text: '插件列表',
                //     name: 'admin-plugins',
                // },
                {
                    text: '媒体库',
                    name: 'admin-mediums',
                },
                // {
                //     text: '设置',
                //     name: 'admin-settings',
                // },
            ],
        }
    },
    computed: {
        ...mapState('global', ['siteName']),
        currentNav() {
            return this.$route.name
        },
    },
    methods: {
        ...mapActions('user', ['logout']),
        go(name) {
            this.$router.push({ name })
        },
        async handleLogout() {
            await this.logout()
            this.$router.push('/')
        },
    },
}
</script>
<style lang="less">
.admin {
    .admin__nav {
        width: 100%;
        background: #515a6e;
    }
    .ivu-menu {
        overflow-x: scroll;
        display: flex;
        max-width: 1200px;
        margin: 0 auto;
        li {
            flex-shrink: 0; // 子容器不伸缩
        }
    }
}
</style>

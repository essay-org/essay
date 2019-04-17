<template>
    <div class="default">
        <i-layout>
            <i-header>
                <div class="header">
                    <div class="header__left">
                        <nuxt-link to="/">{{ siteName }}</nuxt-link>
                    </div>
                    <div
                        class="header__center"
                        :class="showNav ? 'sm-show' : ''"
                    >
                        <div class="center_nav">
                            <ul>
                                <li v-for="(item, index) in navs" :key="index">
                                    <nuxt-link
                                        :to="item.path"
                                    >{{item.title}}</nuxt-link>
                                </li>
                            </ul>
                        </div>
                        <div class="center_search">
                            <i-input
                                :maxlength="30"
                                v-model="keywords"
                                style="width: 200px"
                                search
                                @on-search="handleSearch"
                                autocomplete="off"
                                placeholder="搜索"
                            ></i-input>
                        </div>
                    </div>
                    <div class="header__right">
                        <i-icon
                            type="md-menu"
                            @click.native="showNav = !showNav"
                        />
                    </div>
                </div>
            </i-header>
            <div style="height: 60px"></div>
            <i-content>
                <nuxt/>
            </i-content>
            <div class="write" @click="$router.push('/admin/posts')">
            <span class="wmui icon-feather"></span>
            </div>
        </i-layout>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'Default',
    head() {
        return {
            title: this.seo.title,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.seo.keywords,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.seo.description,
                },
            ],
        }
    },
    data() {
        return {
            keywords: this.$route.name === 'search-id' ? this.$route.params.id : '',
            showNav: false,
        }
    },
    computed: {
        ...mapState('global', ['siteName', 'copyRight', 'seo']),
        ...mapState('user', ['user']),
        ...mapState('page', ['pages']),
        navs() {
            const pages = this.pages.map(i => ({
                title: i.name,
                path: `/pages/${i.id}`,
            }))
            return [
                {
                    title: '首页',
                    path: '/',
                },
                {
                    title: '分类',
                    path: '/categories',
                },
                {
                    title: '标签',
                    path: '/tags',
                },
                ...pages,
            ]
        },
    },
    watch: {
        $route() {
            this.showNav = false
        },
    },
    methods: {
        ...mapActions('user', [
            'logout',
            'login',
            'register',
        ]),
        handleSearch(keywords) {
            if (keywords) {
                this.$router.push(`/search/${keywords}`)
            }
        },
    },
}
</script>

<style lang="less">
.default {
    position: relative;
    .nuxt-link-exact-active {
        color: #64b587 !important;
    }
    .ivu-layout {
        background: #fff;
    }
    .ivu-layout-header {
        background: #fff;
        height: 60px;
        line-height: 60px;
        padding: 0 15px;
        width: 100%;
        border-bottom: 1px solid #f3f3f3;
        position: fixed;
        z-index: 9;
    }
    .ivu-icon-md-menu {
        display: none;
    }
    .header {
        max-width: 960px;
        margin: 0 auto;
        font-size: 18px;

        .header__left {
            width: 150px;
            float: left;
            a {
                color: #666 !important;
            }
        }
        .header__center {
            display: flex;
            justify-content: space-between;
            .center_nav {
                li {
                    display: inline-block;
                    list-style: none;
                    a {
                        display: block;
                        padding: 0 15px;
                        color: #666;
                    }
                }
            }
        }
        .header__right {
            float: right;
        }
    }
    .write {
        position: fixed;
        box-sizing: border-box;
        color: #64b587;
        right: 15px;
        bottom: 30px;
        font-weight: bold;
        line-height: 1;
        padding: 10px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 2px 2px #ccc;
        cursor: pointer;
        .icon-feather {
            font-size: 20px;
        }
    }
}

@media screen and (max-width: 900px) {
    .default {
        .ivu-icon-md-menu {
            font-size: 30px;
            display: inline-block !important;
        }
        .ivu-input-type {
            width: 100% !important;
        }
        .sm-show {
            display: block !important;
        }
        .header {
            .header__center {
                display: none;
                background: #fff;
                position: absolute;
                width: 100%;
                top: 60px;
                left: 0px;
                .center_nav {
                    border-bottom: 1px solid #eee;
                }

                .center_search {
                    padding: 0 15px;
                    margin-left: 0;
                    border-bottom: 1px solid #eee;
                }
            }
        }
    }
}
</style>

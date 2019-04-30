<template>
    <div class="list">
        <template v-if="total === 0">
            <div class="list-null">空空如也</div>
        </template>
        <template v-else>
            <ul
                class="list-article"
                v-scroll="onLoad"
            >
                <!-- 置顶 -->
                <li
                    v-for="(article, index) in articlesTop"
                    :key="index"
                >
                    <nuxt-link
                        target="_blank"
                        class="title_link"
                        :to="'/posts/' + article.id"
                    >
                        <h2 class="article__title">

                            <span class="title_top">[置顶]</span>{{ article.title }}

                        </h2>
                        <p class="article__body">{{ article.content | cutString(150)}}</p>
                    </nuxt-link>
                </li>
                <li
                    v-for="article in articles"
                    :key="article.id"
                >
                    <nuxt-link
                        target="_blank"
                        class="title_link"
                        :to="'/posts/' + article.id"
                    >
                        <h2 class="article__title">

                            {{ article.title }}

                        </h2>
                        <p class="article__body">{{ article.content | cutString(150)}}</p>
                    </nuxt-link>
                </li>
            </ul>
            <p
                v-if="loading"
                class="list-tip"
            >loading...</p>
            <p
                v-if="noMoreData || isLast"
                class="list-tip"
            >已经到底啦</p>
        </template>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

let scrollFn = () => { }

export default {
    name: 'BaseList',
    props: {
        query: {
            type: Object,
            default: () => ({}),
        },
        isDraft: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            loading: false,
            page: 1,
            isLast: false,
        }
    },
    directives: {
        scroll: {
            bind(el, binding) {
                if (process.server) return
                scrollFn = () => {
                    // 这里无法访问到this,所以通过外部的onLoad函数来判断是否在loading中
                    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                    // 滚动条到达底部，执行loadData函数
                    if (scrollTop + document.documentElement.clientHeight + 100 >= document.documentElement.scrollHeight) {
                        const onLoad = binding.value
                        onLoad()
                    }
                }
                window.addEventListener('scroll', scrollFn, false)
            },
        },
    },
    computed: {
        ...mapState('article', [
            'articles',
            'total',
            'limit',
            'articlesTop',
        ]),
        noMoreData() {
            return this.articles.length === this.total || this.total === 0
        },
    },
    methods: {
        ...mapActions('article', [
            'getArticles',
            'getDrafts',
        ]),
        async onLoad() {
            if (this.loading || this.noMoreData || this.isLast) return
            this.loading = true
            this.page = this.page + 1
            const params = {
                ...this.query,
                page: this.page,
            }
            if (this.isDraft) {
                await this.getDrafts(params).then((data) => {
                    this.isLast = data.length < this.limit
                })
            } else {
                await this.getArticles(params).then((data) => {
                    this.isLast = data.length < this.limit
                })
            }
            this.loading = false
        },
    },
    destroyed() {
        if (process.server) return
        window.removeEventListener('scroll', scrollFn, false)
    },
}
</script>
<style lang="less">
@import "~assets/styles/iview.less";
.list {
    ul {
        list-style: none;
    }
    .list-null {
        text-align: center;
        font-size: 20px;
        color: #666;
    }
    .list-tip {
        text-align: center;
        color: #999;
    }
    .list-article {
        li {
            margin-bottom: 40px;
            .article__title {
                font-size: 20px;
                font-weight: normal;
                color: #333;
                .title_top {
                    font-size: 20px;
                    color: @link-color;
                }
            }
            a:hover {
                .article__title {
                    color: @link-color;
                }
            }
            .article__body {
                margin: 10px 0;
                color: #666;
                word-wrap: break-word;
            }
        }
    }
}
</style>

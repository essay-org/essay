<template>
    <div class="admin-posts container-admin ">
        <i-row :gutter="20">
            <i-col :xs="24" :sm="18">
                <div style="margin-bottom: 15px">
                    <i-input
                        placeholder="标题"
                        v-model="tmp.title"
                    />
                </div>
                <base-editor-edit
                    v-model="tmp.content"
                    :upload="upload"
                    @save="save(false)"
                />
            </i-col>
            <i-col :xs="24" :sm="6">
                <i-upload
                    type="drag"
                    :max-size="uploadThumbnail.maxSize"
                    :action="uploadThumbnail.action"
                    :on-success="handleSuccess"
                    :on-format-error="handleFormatError"
                    :on-error="handleError"
                    :on-exceeded-size="handleExceededSize"
                >

                    <div
                        v-if="tmp.thumbnail"
                        class="posts__label"
                        :style="{backgroundImage: `url(${tmp.thumbnail})`}"
                    >
                        <i-icon
                            type="ios-cloud-upload"
                            size="52"
                            style="color: #64B888"
                        ></i-icon>
                        <p style="color: #fff">修改缩略图</p>
                    </div>
                    <div
                        class="posts__label"
                        v-else
                    >
                        <i-icon
                            type="ios-cloud-upload"
                            size="52"
                            style="color: #64B888"
                        ></i-icon>
                        <p>上传缩略图</p>
                    </div>
                </i-upload>
                <i-select
                    v-model="tmp.category"
                    @on-change="handleChange"
                    clearable
                    placeholder="添加分类"
                    style="margin: 20px auto"
                >
                    <i-option
                        v-for="item in categories"
                        :value="item.id"
                        :key="item.id"
                    >{{ item.name }}</i-option>
                </i-select>
                <i-select
                    v-if="isShow"
                    multiple
                    filterable
                    v-model="tmp.tags"
                    placeholder="添加标签"
                    style="margin-bottom: 20px"
                >
                    <i-option
                        v-for="item in tags"
                        :key="item.id"
                        :value="item.id"
                    >
                        {{ item.name }}
                    </i-option>
                </i-select>
                <!-- <DatePicker
                    v-if="id"
                    type="datetime"
                    :value="new Date(tmp.createdAt)"
                    :options="dateOption"
                    @on-change="handleDate"
                    placeholder="发布时间"
                    style="margin: 15px 0;display: block;"
                ></DatePicker> -->
                <template v-if="isShow">
                    <i-checkbox v-model="tmp.isRecommend">推荐到首页</i-checkbox>
                    <i-checkbox v-model="tmp.enableComment">允许评论</i-checkbox>
                    <i-checkbox v-model="tmp.isTop">置顶</i-checkbox>
                </template>
                <div style="margin-top: 20px">
                    <i-button
                        style="margin-right: 10px"
                        @click="save(false)"
                    >存为草稿</i-button>
                    <i-button
                        type="primary"
                        @click="save(true)"
                    >发布文章</i-button>
                </div>
            </i-col>
        </i-row>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { debounce } from 'lodash'

export default {
    name: 'AdminPosts',
    middleware: 'admin',
    layout: 'admin',
    data() {
        return {
            id: this.$route.params.id || this.$route.query.id,
            newId: '',
            isShow: true,
            dateOption: {
                disabledDate(date) {
                    return date && date.valueOf() > Date.now()
                },
            },
            tmp: {},
        }
    },
    methods: {
        ...mapActions('article', [
            'getArticle',
            'postArticle',
            'patchArticle',
        ]),
        ...mapActions('category', [
            'getCategories',
        ]),
        ...mapActions('tag', [
            'getTags',
        ]),
        handleSuccess(url) {
            this.tmp.thumbnail = url
        },
        handleFormatError() {
            this.$Notice.error({
                title: '文件格式不正确',
            })
        },
        handleExceededSize() {
            this.$Notice.error({
                title: `文件不能超过${this.uploadThumbnail.maxSize / 1024}M`,
            })
        },
        handleError() {
            this.$Notice.error({
                title: '上传失败',
            })
        },
        handleChange(id) {
            this.tmp.tags = []
            // 默认状态
            this.tmp.isRecommend = false
            this.tmp.enableComment = true
            this.tmp.isTop = false
            // 分类是否公开
            const obj = this.categories.find(item => item.id === id)
            this.isShow = obj && obj.isShow
        },
        setDefault() {
            this.tmp = {
                user: this.user.id,
                title: '',
                content: '',
                abstract: '',
                thumbnail: '',
                category: '',
                tags: [],
                isRecommend: false,
                enableComment: true,
                isTop: false,
                isPublish: false,
            }
        },
        async save(state, isTip = true) {
            this.tmp.isPublish = state

            if (!this.tmp.content) {
                this.$Message.error('内容不能为空哦')
                return
            }
            if (this.id) {
                await this.patchArticle(this.tmp)
            } else {
                const { data } = await this.postArticle(this.tmp)
                this.id = data.id
                this.tmp.id = data.id
                this.$router.push({
                    name: 'admin-posts-id',
                    query: {
                        id: data.id,
                    },
                })
            }

            if (state === true && isTip) {
                this.$Message.success('文章已发布')
            }

            if (state === false && isTip) {
                this.$Message.success('文章已保存')
            }
        },
    },
    computed: {
        ...mapState('category', [
            'categories',
        ]),
        ...mapState('tag', [
            'tags',
        ]),
        ...mapState('article', [
            'article',
        ]),
        ...mapState('global', ['domain', 'siteName', 'token']),
        ...mapState('user', ['user']),
        upload() {
            return {
                url: `${this.domain}/api/upload-img`,
                headers: {
                    Token: this.token,
                },
            }
        },
        uploadThumbnail() {
            return {
                action: `${this.domain}/api/upload-img`,
                name: 'file',
                maxSize: 5 * 1024,
                format: ['jpg', 'jpeg', 'png'],
                accept: 'image/*',
                headers: {
                    Token: this.token,
                },
            }
        },
    },
    async mounted() {
        this.getCategories()
        this.getTags()
        if (this.id) {
            await this.getArticle(this.id)
            this.tmp = {
                ...this.article,
                category: this.article.category.id,
                tags: this.article.tags.map(i => i.id),
                user: this.article.user.id,
            }
        } else {
            this.setDefault()
        }
    },
    watch: {
        /* eslint-disable func-names */
        'tmp.content': debounce(function (newVal) {
            if (newVal) {
                // 自动保存成草稿
                this.save(false, false)
            }
        }, 1000),
    },
}
</script>
<style lang="less">
.admin-posts {
    .posts__label {
        padding: 50px 0;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    .editor-edit {
        margin-bottom: 20px;
    }
}
</style>

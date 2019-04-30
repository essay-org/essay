<template>
    <div class="admin-categories container-admin">
        <i-modal
            v-model="modal"
            @on-ok="handleOk"
        >
            <p slot="header">分类</p>
            <div v-if="modal">
                <i-form
                    :model="category"
                    :label-width="100"
                    :rules="rules"
                    ref="form"
                >
                    <i-form-item
                        label="分类名："
                        prop="name"
                    >
                        <i-input v-model="category.name"></i-input>
                    </i-form-item>
                    <i-form-item label="关键字：">
                        <i-input v-model="category.keywords"></i-input>
                    </i-form-item>
                    <i-form-item label="描述：">
                        <i-input
                            v-model="category.description"
                            type="textarea"
                        />
                    </i-form-item>
                    <i-form-item label="权重：">
                        <i-input-number
                            v-model="category.sort"
                            :min="0"
                        />
                    </i-form-item>
                    <i-form-item label="状态：">
                        <i-checkbox
                            v-model="category.isShow"
                            :disabled="!!category.id"
                        >公开分类</i-checkbox>
                    </i-form-item>
                </i-form>
            </div>
        </i-modal>
        <i-button
            type="primary"
            @click="handlePost"
            style="margin-bottom: 15px"
        >添加分类</i-button>

        <i-table
            :columns="columns"
            :data="categories"
        >
            <template
                slot="name"
                slot-scope="{row}"
            >
                <nuxt-link :to="`/categories/${row.id}`">{{ row.name}}</nuxt-link>
            </template>
            <template
                slot="operation"
                slot-scope="{row}"
            >
                <i-poptip
                    confirm
                    @on-ok="handleDelete(row)"
                    title="确定删除吗"
                >
                    <i-button size="small">删除</i-button>
                </i-poptip>
                <i-button
                    size="small"
                    @click="handlePatch(row)"
                >编辑</i-button>
            </template>
        </i-table>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'AdminCategories',
    layout: 'admin',
    middleware: 'admin',
    data() {
        return {
            modal: false,
            columns: [
                {
                    title: '名称',
                    slot: 'name',
                    minWidth: 100,
                },
                {
                    title: '文章数',
                    key: 'total',
                    minWidth: 100,
                },
                {
                    title: '权重',
                    key: 'sort',
                    minWidth: 100,
                },
                {
                    title: '状态',
                    render: (h, { row }) => h('span', row.isShow ? '公开' : '私有'),
                    minWidth: 100,
                },
                {
                    title: '创建日期',
                    render: (h, { row }) => h('p', this.$Moment(row.createdAt).format('YYYY年MM月DD日')),
                    minWidth: 160,
                },
                {
                    title: '操作',
                    slot: 'operation',
                    minWidth: 150,
                },
            ],
            rules: {
                name: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '必填项',
                    },
                ],
            },
            category: {},
        }
    },
    computed: {
        ...mapState('category', [
            'categories',
        ]),
    },
    mounted() {
        this.getCategories()
        this.setDefault()
    },
    methods: {
        ...mapActions('category', [
            'postCategory',
            'deleteCategory',
            'patchCategory',
            'getCategories',
        ]),
        setDefault() {
            this.category = {
                id: '',
                name: '',
                keywords: '',
                description: '',
                sort: 0,
                isShow: true,
            }
        },
        handleOk() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    if (this.category.id) {
                        await this.patchCategory(this.category)
                    } else {
                        await this.postCategory(this.category)
                    }
                    this.modal = false
                    this.getCategories()
                }
            })
        },
        async handleDelete(row) {
            await this.deleteCategory(row.id)
            this.getCategories()
        },
        handlePatch(row) {
            this.modal = true
            this.category = row
        },
        handlePost() {
            this.modal = true
            this.setDefault()
        },
    },
}
</script>

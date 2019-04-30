<template>
    <div class="admin-tags container-admin">
        <i-modal
            v-model="modal"
            @on-ok="handleOk"
        >
            <p slot="header">标签</p>
            <div v-if="modal">
                <i-form
                    :model="tag"
                    :label-width="100"
                    :rules="rules"
                    ref="form"
                >
                    <i-form-item
                        label="标签名："
                        prop="name"
                    >
                        <i-input
                            v-model="tag.name"
                            @on-enter="handleOk"
                        ></i-input>

                    </i-form-item>
                    <i-form-item label="权重：">
                        <i-input-number
                            v-model="tag.sort"
                            :min="0"
                        />
                    </i-form-item>
                </i-form>
            </div>
        </i-modal>
        <i-button
            type="primary"
            @click="handlePost"
            style="margin-bottom: 15px"
        >添加标签</i-button>
        <i-table
            :columns="columns"
            :data="tags"
        >
            <template
                slot="name"
                slot-scope="{row}"
            >
                <nuxt-link :to="`/tags/${id}`">{{ row.name}}</nuxt-link>
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
    name: 'AdminTags',
    layout: 'admin',
    middleware: 'admin',
    data() {
        return {
            modal: false,
            tag: {},
            id: this.$route.params.id,
            columns: [
                {
                    title: '名称',
                    slot: 'name',
                    minWidth: 100,
                },
                {
                    title: '权重',
                    key: 'sort',
                    minWidth: 100,
                },
                {
                    title: '创建日期',
                    minWidth: 160,
                    render: (h, { row }) => h('p', this.$Moment(row.createdAt).format('YYYY年MM月DD日')),
                },
                {
                    title: '操作',
                    minWidth: 150,
                    slot: 'operation',
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
        }
    },
    computed: {
        ...mapState('tag', [
            'tags',
        ]),
    },
    mounted() {
        this.setDefault()
        this.getTags()
    },
    methods: {
        ...mapActions('tag', [
            'postTag',
            'deleteTag',
            'patchTag',
            'getTags',
        ]),
        setDefault() {
            this.tag = {
                id: '',
                name: '',
                sort: 0,
            }
        },
        handleOk() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    if (this.tag.id) {
                        await this.patchTag(this.tag)
                    } else {
                        await this.postTag(this.tag)
                    }
                    this.modal = false
                    this.getTags()
                }
            })
        },
        async handlePost() {
            this.modal = true
            this.setDefault()
        },
        async handleDelete(row) {
            await this.deleteTag(row.id)
            this.getTags()
        },
        handlePatch(row) {
            this.modal = true
            this.tag = {
                ...row,
            }
        },
    },
}
</script>

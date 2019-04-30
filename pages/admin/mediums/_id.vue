<template>
    <div class="admin-mediums-id container-admin">
        <i-modal
            v-model="modal"
            @on-ok="handleOk"
        >
        <p slot="header">文件信息</p>
            <div v-if="modal">
                <i-form
                    :model="tmp"
                    :label-width="100"
                    :rules="rules"
                    ref="form"
                >
                    <i-form-item
                        label="文件名："
                        prop="filename"
                    >
                        <i-input v-model="tmp.filename"></i-input>
                    </i-form-item>
                    <i-form-item label="描述：">
                        <i-input
                            v-model="tmp.description"
                            type="textarea"
                        />
                    </i-form-item>
                </i-form>
            </div>
        </i-modal>
        <i-upload
            multiple
            :action="upload.action"
            :data="upload.data"
            :on-success="handleGetMediums"
        >
            <i-button icon="ios-cloud-upload-outline">上传文件</i-button>
        </i-upload>
        <i-table :data="mediums" :columns="columns">
            <template slot="filename" slot-scope="{row}">
                <nuxt-link :to="`/public/medium/${row.filename}`" target="_blank">{{ row.filename }}</nuxt-link>
            </template>
            <template slot="operator" slot-scope="{row}">
                <i-poptip
                    confirm
                    @on-ok="handleDelete(row.filename)"
                    title="确定删除吗"
                >
                    <i-button size="small">删除</i-button>
                </i-poptip>
                <i-button size="small" @click="handlePatch(row)">编辑</i-button>
            </template>
        </i-table>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'AdminMediumsId',
    layout: 'admin',
    middleware: 'admin',
    data() {
        return {
            id: this.$route.params.id,
            tmp: {},
            modal: false,
            rules: {},
            columns: [
                {
                    title: '文件名',
                    slot: 'filename',
                    minWidth: 150,
                    ellipsis: true,
                },
                {
                    title: '类型',
                    key: 'type',
                    minWidth: 100,
                },
                {
                    title: '大小',
                    render: (h, { row }) => {
                        const size = row.size / 1024 > 1
                            ? `${Math.ceil(row.size / 1024)}m`
                            : `${row.size}kb`
                        return h('p', size)
                    },
                    minWidth: 100,
                },
                {
                    title: '上传时间',
                    render: (h, { row }) => h('p', this.$Moment(row.createdAt).format('YYYY年MM月DD日')),
                    minWidth: 160,
                },
                {
                    title: '操作',
                    slot: 'operator',
                    minWidth: 150,
                },
            ],
        }
    },
    computed: {
        ...mapState('global', ['domain', 'siteName', 'token']),
        ...mapState('medium', ['mediums']),
        upload() {
            return {
                action: `${this.domain}/api/upload-file`,
                data: {
                    category: this.id,
                },
                accept: '*',
                name: 'file',
                headers: {
                    Token: this.token,
                },
            }
        },
    },
    methods: {
        ...mapActions('medium', ['getMediums', 'deleteMedium', 'patchMedium']),
        async handleDelete(filename) {
            await this.deleteMedium(filename)
            this.handleGetMediums()
        },
        handleGetMediums() {
            this.getMediums(this.id)
        },
        handlePatch(row) {
            this.modal = true
            this.tmp = {
                ...row,
            }
        },
        async handleOk() {
            await this.patchMedium({
                id: this.tmp.id,
                filename: this.tmp.filename,
                description: this.tmp.description,
            })
            this.handleGetMediums()
        },
    },
    mounted() {
        this.handleGetMediums()
    },
}
</script>

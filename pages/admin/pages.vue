<template>
    <div class="admin-pages container-admin">
        <i-button
            type="primary"
            @click="handlePost"
            style="margin-bottom: 15px"
        >新增单页</i-button>
        <i-row :gutter="30">
            <i-col
                :xs="24"
                :sm="8"
                v-for="(item, index) in pages"
                :key="index"
                style="margin-bottom: 30px"
            >
                <i-card dis-hover>
                    <p slot="title">{{ item.name }}</p>
                    <p>
                        {{ item.description }}
                    </p>
                    <div slot="extra">
                        <i-poptip
                            confirm
                            title="确定要删除吗？"
                            @on-ok="handledDelete(item.id)"
                        >
                            <i-button
                                size="small"
                            >删除</i-button>
                        </i-poptip>
                        <i-button
                            size="small"
                            @click="handlePatch(item.id)"
                        >编辑</i-button>
                    </div>
                </i-card>
            </i-col>
        </i-row>
        <i-modal
            v-model="modal"
            title="单页管理"
            fullscreen
        >
            <i-input
                placeholder="名字"
                v-model="pageTmp.name"
                style="margin-bottom: 15px"
            />
            <base-editor-edit
                v-model="pageTmp.description"
                :upload="upload"
                @save="save"
            />
            <div slot="footer">
                <i-button
                    type="primary"
                    @click="save"
                >保存</i-button>
            </div>
        </i-modal>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'AdminPages',
    layout: 'admin',
    middleware: 'admin',
    data() {
        return {
            pageTmp: {},
            modal: false,
            upload: {},
        }
    },
    methods: {
        ...mapActions('page', [
            'getPages',
            'getPage',
            'patchPage',
            'postPage',
            'deletePage',
        ]),
        async save() {
            if (this.pageTmp.id) {
                await this.patchPage(this.pageTmp)
                this.modal = false
                this.getPages()
            } else {
                await this.postPage(this.pageTmp)
                this.modal = false
                this.getPages()
            }
        },
        async handledDelete(id) {
            await this.deletePage(id)
            this.getPages()
        },
        async handlePatch(id) {
            await this.getPage(id)
            this.pageTmp = {
                ...this.page,
            }
            this.modal = true
        },
        handlePost() {
            this.modal = true
            this.pageTmp = {
                name: '',
                description: '',
            }
        },
    },
    computed: {
        ...mapState('page', [
            'pages',
            'page',
        ]),
    },
    mounted() {
        this.getPages()
    },
}
</script>
<style lang="less">
.admin-pages {
    .ivu-card-body {
        height: 150px;
        overflow: hidden;
    }
}
</style>

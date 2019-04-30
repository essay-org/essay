<template>
    <div class="admin-mediums container-admin">
        <i-button
            type="primary"
            @click="handlePost"
            style="margin-bottom: 15px"
        >新增媒体库</i-button>
        <i-row :gutter="30">
            <i-col
                :xs="24"
                :sm="8"
                v-for="(item, index) in mediumCategories"
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
                                :disabled="item.total !== 0"
                            >删除</i-button>
                        </i-poptip>
                        <i-button
                            size="small"
                            @click="handlePatch(item.id)"
                        >编辑</i-button>
                        <i-button size="small" @click="$router.push(`/admin/mediums/${item.id}`)">详情</i-button>
                    </div>
                </i-card>
            </i-col>
        </i-row>
        <i-modal
            v-model="modal"
            title="媒体库分类"
        >
            <i-input
                placeholder="分类名字"
                v-model="tmp.name"
                style="margin-bottom: 15px"
            />
            <i-input
                placeholder="分类描述"
                v-model="tmp.description"
                type="textarea"
                style="margin-bottom: 20px;"
            />
            <i-checkbox
                v-model="tmp.isShow"
                :disabled="!!tmp.id"
            >公开分类</i-checkbox>
            <div slot="footer">
                <i-button
                    type="primary"
                    @click="handleSave"
                >保存</i-button>
            </div>
        </i-modal>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'AdminMediums',
    layout: 'admin',
    middleware: 'admin',
    data() {
        return {
            tmp: {},
            modal: false,
            upload: {},
        }
    },
    methods: {
        ...mapActions('medium', [
            'getMediumCategories',
            'getMediumCategory',
            'deleteMediumCategory',
            'postMediumCategory',
            'patchMediumCategory',
        ]),
        async handleSave() {
            if (this.tmp.id) {
                await this.patchMediumCategory(this.tmp)
                this.modal = false
                this.getMediumCategories()
            } else {
                await this.postMediumCategory(this.tmp)
                this.modal = false
                this.getMediumCategories()
            }
        },
        async handledDelete(id) {
            await this.deleteMediumCategory(id)
            this.getMediumCategories()
        },
        async handlePatch(id) {
            await this.getMediumCategory(id)
            this.tmp = {
                ...this.mediumCategory,
            }
            this.modal = true
        },
        handlePost() {
            this.modal = true
            this.tmp = {
                name: '',
                isShow: false,
                description: '',
            }
        },
    },
    computed: {
        ...mapState('medium', [
            'mediumCategory',
            'mediumCategories',
        ]),
    },
    mounted() {
        this.getMediumCategories()
    },
}
</script>

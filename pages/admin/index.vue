<template>
    <div class="admin-index container-admin ">
        <i-modal
            v-model="showModal"
            footer-hide
        >
            <p slot="header">系统信息</p>
            <i-form :label-width="100">
                <i-form-item label="网站：">
                    <a :href="domain">{{domain}}</a>
                </i-form-item>
                <i-form-item label="程序版本：">
                    v{{system.version}}
                </i-form-item>
                <i-form-item label="操作系统：">
                    {{system.osType}} - {{system.osRelease}}
                </i-form-item>
                <i-form-item label="Node版本：">
                    v{{system.nodeVersion}}
                </i-form-item>
                <i-form-item label="数据库版本：">
                    v{{system.databaseVersion}}
                </i-form-item>
            </i-form>
        </i-modal>
        <i-modal
            v-model="showModal2"
            footer-hide
        >
            <i-form :label-width="100">
                <i-form-item label="邮箱：">
                    <a
                        href="mailto:qq22337383@gmail.com?subject=意见反馈"
                        target="_blank"
                    >qq22337383@gmail.com</a>
                </i-form-item>
                <i-form-item label="交流群：">
                    <span>488268810</span>
                </i-form-item>
            </i-form>
        </i-modal>
        <div class="admin__link">
            <i-row>
                <i-col :sm="6" :xs="8">
                    <a @click="$router.push('/')">
                        <i-icon
                            type="md-home"
                            :size="30"
                        />
                        <p>博客首页</p>
                    </a>
                </i-col>
                <i-col :sm="6" :xs="8">
                    <a
                        href="https://github.com/wmui/essay"
                        target="_blank"
                    >
                        <i-icon
                            type="logo-github"
                            :size="30"
                        />
                        <p>GitHub</p>
                    </a>
                </i-col>
                <i-col :sm="6" :xs="8">
                    <a
                        href="https://github.com/wmui/essay/wikis"
                        target="_blank"
                    >
                        <i-icon
                            type="md-help-circle"
                            :size="30"
                        />
                        <p>API 文档</p>
                    </a>
                </i-col>
                <i-col :sm="6" :xs="8">
                    <a @click="showModal2=true">
                        <i-icon
                            type="md-mail"
                            :size="30"
                        />
                        <p>联系作者</p>
                    </a>
                </i-col>
                <i-col :sm="6" :xs="8">
                    <a @click="showModal=true">
                        <i-icon
                            type="md-settings"
                            :size="30"
                        />
                        <p>系统信息</p>
                    </a>
                </i-col>
                <i-col :sm="6" :xs="8">
                    <a @click="handleDataup">
                        <i-icon
                            type="md-cloud-download"
                            :size="30"
                        />
                        <p>数据备份</p>
                    </a>
                </i-col>
            </i-row>
        </div>
        <!-- <i-divider dashed />
        <div class="admin__link">

        </div> -->
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'AdminIndex',
    middleware: 'admin',
    layout: 'admin',
    data() {
        return {
            showModal: false,
            showModal2: false,
        }
    },
    methods: {
        ...mapActions('tool', ['getSystem']),
        handleDataup() {
            window.open('/api/backup')
        },
    },
    computed: {
        ...mapState('tool', ['system']),
        ...mapState('global', ['domain']),
    },
    mounted() {
        this.getSystem()
    },
}
</script>
<style lang="less">
.admin {
    // &__data,
    // &__link {
    //     display: flex;
    //     justify-content: space-around;
    //     text-align: center;
    // }
    // &__data {
    //     margin-top: 30px;
    //     span {
    //         font-size: 20px;
    //         font-weight: bold;
    //     }
    // }
    &__link {
        .ivu-col {
            text-align: center;
            padding: 15px 0;
        }
    }
    .office_qq {
        text-align: center;
        img {
            width: 150px;
        }
    }
}
</style>

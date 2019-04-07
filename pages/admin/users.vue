<template>
    <div class="admin-users container-admin">
        <i-table
            :data="users"
            :columns="columns"
        >
            <template
                slot="avatar"
                slot-scope="{row}"
            >
                <img
                    :src="row.avatar"
                    alt="avatar"
                    width="50px"
                    height="50px"
                    class="avatar"
                >
            </template>
        </i-table>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'AdminUsers',
    layout: 'admin',
    middleware: 'admin',
    data() {
        return {
            columns: [
                {
                    title: '头像',
                    slot: 'avatar',
                },
                {
                    title: '用户名',
                    key: 'username',
                },
                {
                    title: '描述',
                    key: 'discription',
                },
                {
                    title: '邮箱',
                    key: 'email',
                },
            ],
        }
    },
    methods: {
        ...mapActions('user', [
            'getUsers',
        ]),
    },
    computed: {
        ...mapState('user', [
            'users',
        ]),
    },
    mounted() {
        this.getUsers()
    },
}
</script>
<style lang="less">
.admin-users {
    .avatar {
        border-radius: 50%;
        vertical-align: middle;
    }
}
</style>

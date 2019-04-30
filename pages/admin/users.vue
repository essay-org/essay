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
                    minWidth: 100,
                },
                {
                    title: '用户名',
                    key: 'username',
                    minWidth: 150,
                },
                {
                    title: '描述',
                    key: 'discription',
                    minWidth: 150,
                },
                {
                    title: '邮箱',
                    key: 'email',
                    minWidth: 150,
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

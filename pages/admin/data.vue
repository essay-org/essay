<template>
    <div class="admin-data container-admin">
        <i-button @click="handleBackup">备份数据</i-button>
    </div>
</template>
<script>
export default {
    name: 'AdminData',
    layout: 'admin',
    middleware: 'admin',
    methods: {
        handleBackup() {
            window.open('/api/backup')
        },
    },
}
</script>

<template>
    <section class="error">
        <h1 class="error-title">
            {{ error.statusCode }}
        </h1>
        <h2 class="error-info">
            {{ message }}
        </h2>
        <i-button
            class="link"
            @click="$router.go(-1)"
        >返回上一页</i-button>
        <i-button
            class="link"
            @click="$router.push('/')"
        >返回首页</i-button>
    </section>
</template>
<script>
export default {
    props: ['error'],
    layout: 'base',
    head() {
        return {
            title: this.error.statusCode,
        }
    },
    computed: {
        message() {
            const infoMap = {
                404: '啊哦，网页被外星人带走了',
                500: '啊哦，服务器开了点小差',
            }
            return infoMap[this.error.statusCode]
        },
    },
}
</script>
<style lang="less">
.error {
    text-align: center;
    padding-top: 100px;
    .error-title {
        font-size: 80px;
        font-weight: 500;
        letter-spacing: 10px;
    }
    .error-info {
        font-weight: 300;
        color: #666;
        font-size: 20px;
        margin: 0;
    }
    .link {
        margin: 50px auto;
    }
}
</style>

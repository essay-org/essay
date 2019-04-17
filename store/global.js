export const mutations = {
    setData(state, payload) {
        state[payload.key] = payload.value
    },
}
export const actions = {
}

export const state = () => ({
    domain: process.env.DOMAIN,
    siteName: process.env.SITE_NAME,
    copyRight: '2014-2019 ©️ Essay',
    token: '',
    seo: {
        title: 'Essay-简约而不简单的博客系统',
        keywords: 'Essay，JavaScript博客系统，NodeJS博客系统',
        description: 'Essay，基于JavaScript构建的前后端同构博客系统，遵循简约而不简单的设计哲学，让每个人都可以方便的记录自己的生活，记录自己的人生',
    },
})

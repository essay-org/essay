import ajax from '@/assets/scripts/ajax'

export const mutations = {
    setData(state, payload) {
        state[payload.key] = payload.value
    },
    setConfig(state, payload) {
        state.seo = payload.seo
        state.siteName = payload.siteName
        state.isConfigEmail = payload.isConfigEmail
        state.isConfigGithub = payload.isConfigGithub
    },
}
export const actions = {
    // 获取前后端共享的数据
    async getSystemConfig({ commit }) {
        const { data } = await ajax.get('/system-config')
        commit('setConfig', data)
    },
}

export const state = () => ({
    domain: process.env.DOMAIN,
    siteName: '',
    seo: {
        title: '',
        keywords: '',
        description: '',
    },
    isConfigEmail: false,
    isConfigGithub: false,
    token: '',
})

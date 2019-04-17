import ajax from '@/assets/scripts/ajax'


export const mutations = {
    setData(state, payload) {
        state[payload.key] = payload.value
    },
}
export const actions = {
    async getPages({ commit }) {
        const { data } = await ajax.get('/pages')
        commit('setData', {
            key: 'pages',
            value: data,
        })
    },
    async getPage({ commit }, id) {
        const { data } = await ajax.get(`/page/${id}`)
        commit('setData', {
            key: 'page',
            value: data,
        })
    },
    async postPage({ commit }, page) {
        return await ajax.post('/page', page)
    },
    async patchPage({ commit }, page) {
        return await ajax.patch(`/page/${page.id}`, page)
    },
    async deletePage({ commit }, id) {
        return await ajax.delete(`/page/${id}`)
    },
}
export const state = () => ({
    pages: [],
    page: {},
})

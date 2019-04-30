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
    async postPage({ commit }, body) {
        return await ajax.post('/page', body)
    },
    async patchPage({ commit }, body) {
        return await ajax.patch(`/page/${body.id}`, body)
    },
    async deletePage({ commit }, id) {
        return await ajax.delete(`/page/${id}`)
    },
}
export const state = () => ({
    pages: [],
    page: {},
})

import ajax from '@/assets/scripts/ajax'


export const mutations = {
    setData(state, payload) {
        state[payload.key] = payload.value
    },
}
export const actions = {
    async getMediums({ commit }, id) {
        const { data } = await ajax.get(`/mediums/${id}`)
        commit('setData', {
            key: 'mediums',
            value: data,
        })
    },
    async patchMedium({ commit }, body) {
        return await ajax.patch(`/medium/${body.id}`, body)
    },
    async deleteMedium({ commit }, filename) {
        return await ajax.delete(`/medium/${filename}`)
    },
    async getMediumCategories({ commit }) {
        const { data } = await ajax.get('/medium-categories')
        commit('setData', {
            key: 'mediumCategories',
            value: data,
        })
    },
    async getMediumCategory({ commit }, id) {
        const { data } = await ajax.get(`/medium-category/${id}`)
        commit('setData', {
            key: 'mediumCategory',
            value: data,
        })
    },
    async postMediumCategory({ commit }, body) {
        return await ajax.post('/medium-category', body)
    },
    async patchMediumCategory({ commit }, body) {
        return await ajax.patch(`/medium-category/${body.id}`, body)
    },
    async deleteMediumCategory({ commit }, id) {
        return await ajax.delete(`/medium-category/${id}`)
    },
}
export const state = () => ({
    mediums: [],
    medium: {},
    mediumCategory: {},
    mediumCategories: [],
})

import ajax from '@/assets/scripts/ajax'


export const mutations = {
    setData(state, payload) {
        state[payload.key] = payload.value
    },
}
export const actions = {
    async getTags({ commit, state }, id) {
        const { data } = await ajax.get('/tags')
        commit('setData', {
            key: 'tags',
            value: data,
        })
    },
    async postTag({ state }, params) {
        return await ajax.post('/tag', params)
    },

    async deleteTag({ state }, id) {
        return await ajax.delete(`/tag/${id}`)
    },

    async patchTag({ state }, params) {
        return await ajax.patch('/tag', params)
    },
}

export const state = () => ({
    tags: [],
})

import ajax from '@/assets/scripts/ajax'


export const mutations = {
    setData(state, payload) {
        state[payload.key] = payload.value
    },
}
export const actions = {
    async getSystem({ commit }) {
        const { data } = await ajax.get('/system')
        commit('setData', {
            key: 'system',
            value: data,
        })
    },
    async postEmail({ commit }, body) {
        return await ajax.post('/email', body)
    },
}

export const state = () => ({
    system: {},
})

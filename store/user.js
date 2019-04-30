import ajax from '@/assets/scripts/ajax'


export const mutations = {
    setData(state, payload) {
        state[payload.key] = payload.value
    },
}
export const actions = {
    // 需要token
    async getUser({ commit }) {
        const { data } = await ajax.get('/user')
        commit('setData', {
            key: 'user',
            value: data,
        })
    },
    async getOtherUser({ commit }, id) {
        const { data } = await ajax.get(`/user-base/${id}`)
        commit('setData', {
            key: 'otherUser',
            value: data,
        })
    },
    // 用户列表，后台展示
    async getUsers({ commit }) {
        const { data } = await ajax.get('/users')
        commit('setData', {
            key: 'users',
            value: data,
        })
    },
    async login({ commit, dispatch }, body) {
        const { success } = await ajax.post('/login', body)
        if (success) {
            await dispatch('getUser')
        }
    },
    async logout({ commit }) {
        await ajax.post('/logout')
        commit('setData', {
            key: 'user',
            value: {},
        })
    },
    async register({ commit }, data) {
        return await ajax.post('/user', data)
    },
    async patchUser({ commit }, user) {
        return await ajax.patch('/user', user)
    },
    async patchPassword({ commit }, body) {
        await ajax.patch('/user/password', body)
        commit('setData', {
            key: 'user',
            value: {},
        })
    },
}

export const state = () => ({
    user: {},
    users: [],
    otherUser: {},
})

import ajax from '@/assets/scripts/ajax'


export const mutations = {
    setData(state, payload) {
        state[payload.key] = payload.value
    },
}
export const actions = {
    async getComments({ commit }) {
        const { data } = await ajax.get('/comments')
        commit('setData', {
            key: 'comments',
            value: data,
        })
    },
    async getCommentsById({ commit }, id) {
        const { data } = await ajax.get(`/comments/${id}`)
        commit('setData', {
            key: 'comments',
            value: data,
        })
    },
    async postComment({ commit }, comment) {
        return await ajax.post('/comment', comment)
    },
    async deleteComment({ commit }, id) {
        return await ajax.delete(`/comment/${id}`)
    },
}

export const state = () => ({
    comments: [],
    comment: {},
})

import ajax from '@/assets/scripts/ajax'

export const mutations = {
    setData(state, payload) {
        state[payload.key] = payload.value
    },
}
export const actions = {
    async getCategories({ commit, rootState }) {
        // 管理员可以看到所有分类
        const { token } = rootState.global
        const { data } = await ajax.get('/categories', {
            headers: {
                token,
            },
        })
        commit('setData', {
            key: 'categories',
            value: data,
        })
    },
    async getCategory({ commit }, id) {
        const { data } = await ajax.get(`/category/${id}`)
        commit('setData', {
            key: 'category',
            value: data,
        })
    },
    async postCategory({ commit }, category) {
        return await ajax.post('/category', category)
    },
    async patchCategory({ commit }, category) {
        return await ajax.patch(`/category/${category.id}`, category)
    },
    async deleteCategory({ commit }, id) {
        return await ajax.delete(`/category/${id}`)
    },
}

export const state = () => ({
    categories: [],
    category: {},
})

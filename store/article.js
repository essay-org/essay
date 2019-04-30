import ajax from '@/assets/scripts/ajax'

export const mutations = {
    setArticles(state, { data, total }) {
        data.forEach((i) => {
            state.articles.push(i)
        })
        state.total = total
    },
    setData(state, payload) {
        state[payload.key] = payload.value
    },
    setComment(state, data) {
        state.article.comments.push(data)
    },
    setArticlesNull(state) {
        state.articles = []
        state.total = 0
    },
    setArticlesTopNull(state) {
        state.articlesTop = []
    },
}

export const actions = {
    async getArticles({ state, commit }, params) {
        const ret = await ajax.get('/articles', {
            params: {
                limit: state.limit,
                ...params,
            },
        })
        const { data } = ret
        if (params && params.keywords) {
            // 关键字加红
            // const keywords = decodeURIComponent(params.keywords)
            // const reg = new RegExp(keywords, 'i')
            // data = data.map(item => ({
            //     ...item,
            //     title: item.title.replace(reg, `<span style="color: red;">${keywords}</span>`),
            // }))
        }
        commit('setArticles', {
            data,
            total: ret.total,
        })
        return data
    },
    async getDrafts({ state, commit }, params) {
        const { data, total } = await ajax.get('/drafts', {
            params: {
                limit: state.limit,
                ...params,
            },
        })
        commit('setArticles', {
            data,
            total,
        })
        return data
    },
    async getArticle({ commit, rootState }, id) {
        // 如果是管理员，可以看到私有文章
        const { token } = rootState.global
        const { data } = await ajax.get(`/article/${id}`, {
            headers: {
                token,
            },
        })
        commit('setData', {
            key: 'article',
            value: data,
        })
    },
    async getArticlesTop({ commit }, id = '') {
        const { data } = await ajax.get(`/articles-top/${id}`)
        commit('setData', {
            key: 'articlesTop',
            value: data,
        })
    },
    async deleteArticle({ commit }, id) {
        return await ajax.delete(`/article/${id}`)
    },
    async postArticle({ commit }, article) {
        return await ajax.post('/article', article)
    },
    async patchArticle({ commit }, article) {
        return await ajax.patch(`/article/${article.id}`, article)
    },
    async patchArticleLikes({ commit }, id) {
        return await ajax.patch(`/article-likes/${id}`)
    },
}

export const state = () => ({
    articles: [],
    articlesTop: [],
    total: 0,
    limit: 15,
    article: {},
})

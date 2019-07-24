import axios from 'axios'
import Vue from 'vue'

const isServer = Vue.prototype.$isServer || process.server
const baseURL = isServer ? `${process.env.DOMAIN}/api` : `${window.location.origin}/api`
const ajax = axios.create({
  baseURL,
  responseType: 'json',
  withCredentials: true,
})

ajax.interceptors.response.use((response) => {
  const { data } = response
  if (data && !isServer && !data.success) {
    alert(data.message)
  }
  return data
}, error => Promise.reject(error))


export const mutations = {
  setData(state, payload) {
    state[payload.key] = payload.value
  },
  setArticles(state, { data, total }) {
    state.articles = data
    state.total = total
  },
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, res }) {
    if (req.cookies.token) {
      commit('setData', {
        key: 'token',
        value: req.cookies.token,
      })
    }
    await Promise.all([
      dispatch('getAdmin'),
      dispatch('getCategories'),
      dispatch('getOptionSeo'),
      dispatch('getArticlesNew'),
    ])
  },

  /**
   * admin api
   */
  async getAdmin({ commit }) {
    const { data } = await ajax.get('/admin')
    commit('setData', {
      key: 'admin',
      value: data,
    })
  },
  async patchAdmin({ commit }, body) {
    return await ajax.patch('/admin', body)
  },
  async patchPassword({ commit }, body) {
    await ajax.patch('/password', body)
    commit('setData', {
      key: 'token',
      value: '',
    })
  },
  async login({ commit, dispatch }, body) {
    const { data } = await ajax.post('/login', body)
    commit('setData', {
      key: 'token',
      value: data.token,
    })
    return data
  },
  async logout({ commit }) {
    await ajax.post('/logout')
    // 清除token
    commit('setData', {
      key: 'token',
      value: '',
    })
  },

  /**
   * article api
   */
  async deleteArticle({ commit }, id) {
    return await ajax.delete(`/article/${id}`)
  },
  async postArticle({ commit }, body) {
    return await ajax.post('/article', body)
  },
  async patchArticle({ commit }, body) {
    return await ajax.patch(`/article/${body.id}`, body)
  },
  async getArticle({ commit, state }, id) {
    // 如果是管理员，可以看到私有文章
    const { token } = state
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
  async getArticlesTop({ commit, state }) {
    const { token } = state
    const { data } = await ajax.get(`/articles-top`, {
      headers: {
        token,
      },
    })
    commit('setData', {
      key: 'articlesTop',
      value: data,
    })
  },

  // 获取最新文章
  async getArticlesNew({ commit, state }) {
    const { token } = state
    const { data } = await ajax.get(`/articles-new`, {
      headers: {
        token,
      },
    })
    commit('setData', {
      key: 'articlesNew',
      value: data,
    })
  },
  async getArticles({ state, commit }, params) {
    const { data, total } = await ajax.get('/articles', {
      params: {
        ...params,
        limit: state.limit,
      }
    })
    commit('setArticles', {
      data,
      total,
    })
    return data
  },
  async getDrafts({ state, commit }, params) {
    const { data, total } = await ajax.get('/drafts', {
      params: {
        ...params,
        limit: state.limit,
      }
    })
    commit('setArticles', {
      data,
      total,
    })
    return data
  },

  /**
   * category api
   */
  async getCategories({ commit, state }) {
    // 管理员可以看到所有分类
    const { token } = state
    const { data } = await ajax.get('/categories', {
      headers: {
        token,
      },
    })
    commit('setData', {
      key: 'categories',
      value: data,
    })
    return data
  },
  async getCategory({ commit }, id) {
    const { data } = await ajax.get(`/category/${id}`)
    commit('setData', {
      key: 'category',
      value: data,
    })
  },
  async postCategory({ commit }, body) {
    return await ajax.post('/category', body)
  },
  async patchCategory({ commit }, body) {
    return await ajax.patch(`/category/${body.id}`, body)
  },
  async deleteCategory({ commit }, id) {
    return await ajax.delete(`/category/${id}`)
  },

  /**
   * comment api
   */
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
  async postComment({ commit }, body) {
    return await ajax.post('/comment', body)
  },
  async postCommentReply({ commit }, body) {
    return await ajax.post('/comment-reply', body)
  },
  async deleteComment({ commit }, id) {
    return await ajax.delete(`/comment/${id}`)
  },

  /**
   * tool api
   */
  async postEmail({ commit }, body) {
    return await ajax.post('/email', body)
  },

  /**
   * option
   */
  async patchOption({ commit }, { name, value }) {
    return await ajax.patch('/option', { name, value })
  },

  async getOptionEmail({ commit, state }) {
    const { token } = state
    const { data } = await ajax.get('/option-email', {
      headers: {
        token,
      },
    })
    commit('setData', {
      key: 'email',
      value: data.value,
    })
  },

  async getOptionSeo({ commit }) {
    const { data } = await ajax.get('/option-seo')

    commit('setData', {
      key: 'seo',
      value: data.value,
    })
  },
}

export const state = () => ({
  seo: {},
  email: {},
  admin: {},
  token: '',
  domain: baseURL,
  articles: [],
  articlesTop: [],
  articlesNew: [],
  total: 0,
  limit: 15,
  article: {},
  categories: [],
  category: {},
  comments: [],
  comment: {},
})

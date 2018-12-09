import axios from 'axios'
axios.defaults.withCredentials = true

export default {
  async nuxtServerInit({ commit, state }, { req, res }) {
    const cookies = req.cookies
    if(cookies.localToken) {
      commit('SET_LOCAL_TOKEN', cookies.localToken)
    }
    if(cookies.adminToken) {
      commit('SET_ADMIN_TOKEN', cookies.adminToken)
    }
    commit('SET_APP', res.locals.app)
    const { data } = await axios.get(`${state.app.baseUrl}/admin`)
    commit('SET_ADMIN_INFO', data)
  },

  async CREATE_TAG({ state }, params) {
    const { data } = await axios.post(`${state.app.baseUrl}/tag`, params)
    return data
  },

  async DELETE_TAG({ state }, id) {
    const { data } = await axios.delete(`${state.app.baseUrl}/tag/${id}`)
    return data
  },

  async UPDATE_TAG({ state }, params) {
    const { data } = await axios.patch(`${state.app.baseUrl}/tag`, params)
    return data
  },

  async TAGS({ commit, state }) {
    const { data } = await axios.get(`${state.app.baseUrl}/tags`)
    commit('SET_TAGS', data)
    return data
  },

  async TAG_ARTICLES({ commit, state }, params) {
    const {
      data
    } = await axios.get(`${state.app.baseUrl}/tag/${params.id}/${state.limit}/${params.page}`)
    commit('SET_TAG_ARTICLES', data)
    return data
  },

  async ARTICLES({ commit, state }, page) {
    const { data } = await axios.get(`${state.app.baseUrl}/articles/${state.limit}/${page}`)
    commit('SET_ARTICLES', data)
    return data
  },

  async STICK_ARTICLES({ commit, state }, page) {
    const { data } = await axios.get(`${state.app.baseUrl}/stick/${state.limit}/${page}`)
    commit('SET_STICK_ARTICLES', data)
    return data
  },

  async DRAFTS({ commit, state }, page) {
    const { data } = await axios.get(`${state.app.baseUrl}/drafts/${state.limit}/${page}`)
    commit('SET_DRAFTS', data)
    return data
  },

  async CREATE_ARTICLE({ state }, params) {
    const { data } = await axios.post(`${state.app.baseUrl}/article`, params)
    return data
  },

  async DELETE_ARTICLE({ state }, id) {
    const { data } = await axios.delete(`${state.app.baseUrl}/article/${id}`)
    return data
  },

  async UPDATE_ARTICLE({ state }, params) {
    const { data } = await axios.patch(`${state.app.baseUrl}/article`, params)
    return data
  },

  async ARTICLE_DETAIL({ commit, state }, id) {
    const { data } = await axios.get(`${state.app.baseUrl}/article/${id}`)
    commit('SET_ARTICLE_DETAIL', data)
    return data
  },

  async CREATE_COMMENT({ state }, params) {
    const { data } = await axios.post(`${state.app.baseUrl}/comment`, params)
    return data
  },

  async COMMENTS({ state }) {
    const { data } = await axios.get(`${state.app.baseUrl}/comments`)
    return data
  },

  async DELETE_COMMENT({ state }, id) {
    const { data } = await axios.delete(`${state.app.baseUrl}/comment/${id}`)
    return data
  },

  async SEARCH({ commit, state }, params) {
    const {
      data
    } = await axios.get(`${state.app.baseUrl}/search/${params.id}/${state.limit}/${params.page}`)
    commit('SET_SEARCH', data)
    return data
  },

  async SEND_EMAIL({ state }, params) {
    const { data } = await axios.post(`${state.app.baseUrl}/send-email`, params)
    return data
  },

  // 获取用户信息
  async USER_INFO({ state }) {
    const { data } = await axios.get(`${state.app.baseUrl}/user`)
    return data
  },

  async UPDATE_ADMIN_INFO({ state }, params) {
    const { data } = await axios.patch(`${state.app.baseUrl}/admin`, params)
    return data
  },

  async UPDATE_ADMIN_PASSWORD({ state }, params) {
    const { data } = await axios.patch(`${state.app.baseUrl}/password`, params)
    return data
  },

  async LOGIN({ commit, state }, user) {
    const { data } = await axios.post(`${state.app.baseUrl}/login`, user)
    if (data.success) commit('SET_ADMIN_TOKEN', data.data.adminToken)
    return data
  },

  async LOGOUT({ state }) {
    const { data } = await axios.post(`${state.app.baseUrl}/logout`)
    commit('CLEAR_ADMIN_TOKEN')
    return data
  },
}

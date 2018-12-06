import axios from 'axios'
axios.defaults.withCredentials = true

export default {
  async nuxtServerInit({ commit, getters }, { req, res }) {
    const cookies = req.cookies
    if(cookies.localToken) {
      commit('SET_LOCAL_TOKEN', cookies.localToken)
    }
    if(cookies.adminToken) {
      commit('SET_ADMIN_TOKEN', cookies.adminToken)
    }

    const { data } = await axios.get(`${getters.baseUrl}/admin`)
    commit('SET_ADMIN_INFO', data)
  },

  async CREATE_TAG({ getters }, params) {
    // eg: {name: 'new tag'}
    const { data } = await axios.post(`${getters.baseUrl}/tag`, params)
    return data
  },

  async DELETE_TAG({ getters }, id) {
    const { data } = await axios.delete(`${getters.baseUrl}/tag/${id}`)
    return data
  },

  async UPDATE_TAG({ getters }, params) {
    // eg: {id: '001', name: 'new tag name'}
    const { data } = await axios.patch(`${getters.baseUrl}/tag`, params)
    return data
  },

  async TAGS({ commit, getters }) {
    const { data } = await axios.get(`${getters.baseUrl}/tags`)
    commit('SET_TAGS', data)
    return data
  },

  async TAG_ARTICLES({ commit, state, getters }, params) {
    const {
      data
    } = await axios.get(`${getters.baseUrl}/tag/${params.id}/${state.limit}/${params.page}`)
    commit('SET_TAG_ARTICLES', data)
    return data
  },

  async ARTICLES({ commit, state, getters }, page) {
    const { data } = await axios.get(`${getters.baseUrl}/articles/${state.limit}/${page}`)
    commit('SET_ARTICLES', data)
    return data
  },

  async STICK_ARTICLES({ commit, state, getters }, page) {
    const { data } = await axios.get(`${getters.baseUrl}/stick/${state.limit}/${page}`)
    commit('SET_STICK_ARTICLES', data)
    return data
  },

  async DRAFTS({ commit, state, getters }, page) {
    const { data } = await axios.get(`${getters.baseUrl}/drafts/${state.limit}/${page}`)
    commit('SET_DRAFTS', data)
    return data
  },

  async CREATE_ARTICLE({ getters }, params) {
    const { data } = await axios.post(`${getters.baseUrl}/article`, params)
    return data
  },

  async DELETE_ARTICLE({ getters }, id) {
    const { data } = await axios.delete(`${getters.baseUrl}/article/${id}`)
    return data
  },

  async UPDATE_ARTICLE({ getters }, params) {
    const { data } = await axios.patch(`${getters.baseUrl}/article`, params)
    return data
  },

  async ARTICLE_DETAIL({ commit, getters }, id) {
    const { data } = await axios.get(`${getters.baseUrl}/article/${id}`)
    commit('SET_ARTICLE_DETAIL', data)
    return data
  },

  async CREATE_COMMENT({ getters }, params) {
    const { data } = await axios.post(`${getters.baseUrl}/comment`, params)
    return data
  },

  async COMMENTS({ getters }) {
    const { data } = await axios.get(`${getters.baseUrl}/comments`)
    return data
  },

  async DELETE_COMMENT({ getters }, id) {
    const { data } = await axios.delete(`${getters.baseUrl}/comment/${id}`)
    return data
  },

  async SEARCH({ commit, state, getters }, params) {
    const {
      data
    } = await axios.get(`${getters.baseUrl}/search/${params.id}/${state.limit}/${params.page}`)
    commit('SET_SEARCH', data)
    return data
  },

  async SEND_EMAIL({ getters }, params) {
    const { data } = await axios.post(`${getters.baseUrl}/send-email`, params)
    return data
  },

  // 获取用户信息
  async USER_INFO({ getters }) {
    const { data } = await axios.get(`${getters.baseUrl}/user`)
    return data
  },

  async UPDATE_ADMIN_INFO({ getters }, params) {
    const { data } = await axios.patch(`${getters.baseUrl}/admin`, params)
    return data
  },

  async UPDATE_ADMIN_PASSWORD({ getters }, params) {
    const { data } = await axios.patch(`${getters.baseUrl}/password`, params)
    return data
  },

  async LOGIN({ commit, getters }, user) {
    const { data } = await axios.post(`${getters.baseUrl}/login`, user)
    if (data.success) commit('SET_ADMIN_TOKEN', data.data.adminToken)
    return data
  },

  async LOGOUT({ getters }) {
    const { data } = await axios.post(`${getters.baseUrl}/logout`)
    commit('CLEAR_ADMIN_TOKEN')
    return data
  },
}

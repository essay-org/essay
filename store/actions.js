import axios from 'axios'
// let getters.baseURL = 'http://localhost:3010/api'
export default {
  async nuxtServerInit({ dispatch, commit }, { req, res }) {
    if (req.token) {
      commit('SET_USER', req.token)
    }
  },

  async CREATE_TAG({ commit, state }, params) {
    // eg: {name: 'new tag'}
    const { data } = await axios.post(`${state.baseURL}/tag`, params, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async DELETE_TAG({ commit, state }, id) {
    const { data } = await axios.delete(`${state.baseURL}/tag/${id}`, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async UPDATE_TAG({ commit, state }, params) {
    // eg: {id: '001', name: 'new tag name'}
    const { data } = await axios.patch(`${state.baseURL}/tag`, params, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async TAGS({ commit, state }, id = '') {
    const { data } = await axios.get(`${state.baseURL}/tags/${id}`)
    return data
  },

  async SEARCH({ commit, state }, id = '') {
    const { data } = await axios.get(`${state.baseURL}/search/${id}`)
    return data
  },

  async ARTICLES({ commit, state }, page = 1, limit = 15) {
    const { data } = await axios.get(`${state.baseURL}/articles/${page}/${limit}`)
    return data
  },

  async PRIVATE_ARTICLES({ commit, state }) {
    const { data } = await axios.get(`${state.baseURL}/private-articles`, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async CREATE_ARTICLE({ commit, state }, params) {
    const { data } = await axios.post(`${state.baseURL}/article`, params, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async DELETE_ARTICLE({ commit, state }, id) {
    // let id = params.id, isPublish = params.publish, data
    const { data } = await axios.delete(`${state.baseURL}/article/${id}`, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async UPDATE_ARTICLE({ commit, state }, params) {
    const { data } = await axios.patch(`${state.baseURL}/article`, params, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async ARTICLE_DETAIL({ commit, state }, id) {
    const { data } = await axios.get(`${state.baseURL}/article/${id}`)
    return data
  },

  async ARCHIVES({ state }) {
    const { data } = await axios.get(`${state.baseURL}/archives`)
    return data
  },

  async ADMIN_INFO({ state }) {
    const { data } = await axios.get(`${state.baseURL}/user`)
    return data
  },

  async UPDATE_ADMIN({ commit, state }, params) {
    const { data } = await axios.patch(`${state.baseURL}/user`, params, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async LOGIN({ commit, state }, user) {
    const { data } = await axios.post(`${state.routerBaseApi}/login`, user)
    commit('SET_USER', data.data.token)
    return data
  },

  async LOGOUT({ commit, state }) {
    const { data } = await axios.post(`${state.routerBaseApi}/logout`, {}, {
      headers: {
        token: state.token
      }
    })
    return data
  }
}

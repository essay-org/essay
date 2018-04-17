import axios from 'axios'
export default {
  async nuxtServerInit({ dispatch, commit, getters }, { req, res }) {
    if (req.headers.cookie) {
      // eg: token='asdf';id='123'
      let cookie = req.headers.cookie
      cookie = cookie.split(';')
      let cookieObj = {}, cookieArr = [], key = '', value = ''
      for (let i = 0; i < cookie.length; i++) {
        cookieArr = cookie[i].split('=')
        key = cookieArr[0]
        value = cookieArr[1]
        cookieObj[key] = value
      }
      commit('SET_TOKEN', cookieObj.token)
    }

    const { data } = await axios.get(`${getters.baseUrl}/user`)
    commit('SET_USER', data)
  },

  async CREATE_TAG({ commit, state, getters }, params) {
    // eg: {name: 'new tag'}
    const { data } = await axios.post(`${getters.baseUrl}/tag`, params, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async DELETE_TAG({ commit, state, getters }, id) {
    const { data } = await axios.delete(`${getters.baseUrl}/tag/${id}`, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async UPDATE_TAG({ commit, state, getters }, params) {
    // eg: {id: '001', name: 'new tag name'}
    const { data } = await axios.patch(`${getters.baseUrl}/tag`, params, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async TAGS({ commit, state, getters }, id = '') {
    const { data } = await axios.get(`${getters.baseUrl}/tags/${id}`)
    return data
  },

  async SEARCH({ commit, state, getters }, id = '') {
    const { data } = await axios.get(`${getters.baseUrl}/search/${id}`)
    return data
  },

  async ARTICLES({ commit, state, getters }, page = 1, limit = 15) {
    const { data } = await axios.get(`${getters.baseUrl}/articles/${page}/${limit}`)
    return data
  },

  async PRIVATE_ARTICLES({ commit, state, getters }) {
    const { data } = await axios.get(`${getters.baseUrl}/private-articles`, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async CREATE_ARTICLE({ commit, state, getters }, params) {
    const { data } = await axios.post(`${getters.baseUrl}/article`, params, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async DELETE_ARTICLE({ commit, state, getters }, id) {
    // let id = params.id, isPublish = params.publish, data
    const { data } = await axios.delete(`${getters.baseUrl}/article/${id}`, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async UPDATE_ARTICLE({ commit, state, getters }, params) {
    const { data } = await axios.patch(`${getters.baseUrl}/article`, params, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async ARTICLE_DETAIL({ commit, state, getters }, id) {
    const { data } = await axios.get(`${getters.baseUrl}/article/${id}`)
    return data
  },

  async ARCHIVES({ state, getters }) {
    const { data } = await axios.get(`${getters.baseUrl}/archives`)
    return data
  },

  async ADMIN_INFO({ state, getters }) {
    const { data } = await axios.get(`${getters.baseUrl}/user`)
    return data
  },

  async UPDATE_ADMIN({ commit, state, getters }, params) {
    const { data } = await axios.patch(`${getters.baseUrl}/user`, params, {
      headers: {
        token: state.token
      }
    })
    return data
  },

  async LOGIN({ commit, state, getters }, user) {
    const { data } = await axios.post(`${getters.routerBaseApi}/login`, user)
    commit('SET_TOKEN', data.data.token)
    return data
  },

  async LOGOUT({ commit, state, getters }) {
    const { data } = await axios.post(`${getters.routerBaseApi}/logout`, {}, {
      headers: {
        token: state.token
      }
    })
    return data
  }
}

import axios from 'axios'

export default {
  async nuxtServerInit({ dispatch, commit, getters }, { req, res }) {
    if (req.headers.cookie) {
      // 解析cookie
      let cookie = req.headers.cookie, cookieObj = {}, cookieArr = [], key = '', value = '';
      cookie = cookie.split(';')
      for (let i = 0; i < cookie.length; i++) {
        cookieArr = cookie[i].trim().split('=')
        key = cookieArr[0]
        value = cookieArr[1]
        cookieObj[key] = value
      }
      if(cookieObj.token) {
        commit('SET_TOKEN', cookieObj.token)
      }
      if(cookieObj.githubToken){
        commit('SET_GITHUB_TOKEN', cookieObj.githubToken)
      }
    }

    const { data } = await axios.get(`${getters.baseUrl}/user`)
    commit('SET_USER', data)
  },

  // 标签相关操作
  async CREATE_TAG({ commit, state, getters }, params) {
    // eg: {name: 'new tag'}
    const { data } = await axios.post(`${getters.baseUrl}/tag`, params)
    return data
  },

  async DELETE_TAG({ commit, state, getters }, id) {
    const { data } = await axios.delete(`${getters.baseUrl}/tag/${id}`)
    return data
  },

  async UPDATE_TAG({ commit, state, getters }, params) {
    // eg: {id: '001', name: 'new tag name'}
    const { data } = await axios.patch(`${getters.baseUrl}/tag`, params)
    return data
  },

  async TAGS({ commit, state, getters }) {
    const { data } = await axios.get(`${getters.baseUrl}/tags`)
    commit('SET_TAGS', data)
    return data
  },

  async TAG_ARTICLES({ commit, state, getters }, params) {
    const {
      data
    } = await axios.get(`${getters.baseUrl}/tag/${params.id}/${params.page}/${state.limit}`)
    commit('SET_TAG_ARTICLES', data)
    return data
  },

  // 文章相关操作
  async ARTICLES({ commit, state, getters }, page) {
    const { data } = await axios.get(`${getters.baseUrl}/articles/${page}/${state.limit}`)
    commit('SET_ARTICLES', data)
    return data
  },

  async STICK_ARTICLES({ commit, state, getters }, page) {
    const { data } = await axios.get(`${getters.baseUrl}/stick/${page}/${state.limit}`)
    commit('SET_STICK_ARTICLES', data)
    return data
  },

  async DRAFTS({ commit, state, getters }, page) {
    const { data } = await axios.get(`${getters.baseUrl}/drafts/${page}/${state.limit}`)
    commit('SET_DRAFTS', data)
    return data
  },

  async CREATE_ARTICLE({ commit, state, getters }, params) {
    const { data } = await axios.post(`${getters.baseUrl}/article`, params)
    return data
  },

  async DELETE_ARTICLE({ commit, state, getters }, id) {
    const { data } = await axios.delete(`${getters.baseUrl}/article/${id}`)
    return data
  },

  async UPDATE_ARTICLE({ commit, state, getters }, params) {
    const { data } = await axios.patch(`${getters.baseUrl}/article`, params)
    return data
  },

  async ARTICLE_DETAIL({ commit, state, getters }, id) {
    const { data } = await axios.get(`${getters.baseUrl}/article/${id}`)
    commit('SET_ARTICLE_DETAIL', data)
    return data
  },

  // 评论相关操作
  async CREATE_COMMENT({ commit, state, getters }, params) {
    const { data } = await axios.post(`${getters.baseUrl}/comment`, params)
    return data
  },

  async COMMENTS({ commit, state, getters }, params) {
    const { data } = await axios.get(`${getters.baseUrl}/comments`)
    return data
  },

  async DELETE_COMMENT({ commit, state, getters }, id) {
    const { data } = await axios.delete(`${getters.baseUrl}/comment/${id}`)
    return data
  },

  // 搜索
  async SEARCH({ commit, state, getters }, params) {
    const {
      data
    } = await axios.get(`${getters.baseUrl}/search/${params.id}/${params.page}/${state.limit}`)
    commit('SET_SEARCH', data)
    return data
  },

  // 发送邮件
  async SEND_EMAIL({ commit, state, getters }, params) {
    const { data } = await axios.post(`${getters.baseUrl}/send-email`, params)
    return data
  },

  // 获取用户信息
  async USER_INFO({ commit, state, getters }, username) {
    const { data } = await axios.get(`${getters.baseUrl}/user/${username}`)
    return data
  },

  // 修改信息
  async UPDATE_USER_INFO({ commit, state, getters }, params) {
    const { data } = await axios.patch(`${getters.baseUrl}/user`, params)
    return data
  },

  async UPDATE_USER_PASSWORD({ commit, state, getters }, params) {
    const { data } = await axios.patch(`${getters.baseUrl}/password`, params)
    return data
  },

  // 登录
  async LOGIN({ commit, state, getters }, user) {
    const { data } = await axios.post(`${getters.baseUrl}/login`, user)
    commit('SET_TOKEN', data.data.token)
    return data
  },

  // 退出
  async LOGOUT({ commit, state, getters }) {
    const { data } = await axios.post(`${getters.baseUrl}/logout`)
    return data
  }
}


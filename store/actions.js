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

  async TAGS({ commit, state, getters }, id = '') {
    const { data } = await axios.get(`${getters.baseUrl}/tags/${id}`)
    if(id) {
      commit('SET_TAG_ARTICLES', data)
    }else{
      commit('SET_TAGS', data)
    }
    return data
  },


  // 文章相关操作
  async ARTICLES({ commit, state, getters }, page = 1, limit = 15) {
    const { data } = await axios.get(`${getters.baseUrl}/articles/${page}/${limit}`)
    commit('SET_ARTICLES', data)
    return data
  },

  async PRIVATE_ARTICLES({ commit, state, getters }) {
    const { data } = await axios.get(`${getters.baseUrl}/private-articles`)
    return data
  },

  async CREATE_ARTICLE({ commit, state, getters }, params) {
    const { data } = await axios.post(`${getters.baseUrl}/article`, params)
    return data
  },

  async DELETE_ARTICLE({ commit, state, getters }, id) {
    // let id = params.id, isPublish = params.publish, data
    const { data } = await axios.delete(`${getters.baseUrl}/article/${id}`)
    return data
  },

  async UPDATE_ARTICLE({ commit, state, getters }, params) {
    const { data } = await axios.patch(`${getters.baseUrl}/article`, params)
    return data
  },

  async ARTICLE_DETAIL({ commit, state, getters }, id) {
    const { data } = await axios.get(`${getters.baseUrl}/article/${id}`)
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
  async SEARCH({ commit, state, getters }, id = '') {
    const { data } = await axios.get(`${getters.baseUrl}/search/${id}`)
    commit('SET_SEARCH', data)
    return data
  },

  // 获取归档
  async ARCHIVES({ commit, state, getters }) {
    const { data } = await axios.get(`${getters.baseUrl}/archives`)
    commit('SET_ARCHVES', data)
    return data
  },

  // 发送邮件
  async SEND_EMAIL({ commit, state, getters }, params) {
    const { data } = await axios.post(`${getters.baseUrl}/send-email`, params)
    return data
  },

  // 获取管理员信息
  async ADMIN_INFO({ commit, state, getters }) {
    const { data } = await axios.get(`${getters.baseUrl}/user`)
    return data
  },

  // 更新管理员信息
  async UPDATE_ADMIN({ commit, state, getters }, params) {
    const { data } = await axios.patch(`${getters.baseUrl}/user`, params)
    return data
  },

  // 管理员登录
  async LOGIN({ commit, state, getters }, user) {
    const { data } = await axios.post(`${getters.baseUrl}/login`, user)
    commit('SET_TOKEN', data.data.token)
    return data
  },

  // 管理员退出
  async LOGOUT({ commit, state, getters }) {
    const { data } = await axios.post(`${getters.baseUrl}/logout`)
    return data
  }
}


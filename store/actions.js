import axios from 'axios'
import api from '../api'
export default {
  async nuxtServerInit ({ dispatch,commit }, { req }) {
     if (req.session && req.session.authUser) {
      // 存储token
      commit('SET_USER', req.session.authUser)
    }
    // 初始化组件内的数据
    await dispatch('ADMIN_INFO')
    await dispatch('TAGS')
    await dispatch('ARCHIVES')
  },

  ARTICLE_DETAIL ({ commit, state }, id) {
    return api.articleDetail(id).then((data) => {
      commit('ARTICLE_DETAIL', data)
    })
  },

  LIST_PAGE ({commit, state}, params) {
    // 根据路由获得分类和页数
    let {typeName, category, page} = params
    // console.log(params)
    switch(typeName) {
      case 'archives':
      return api.listByArchive(category,page).then((data) => {
        commit('LIST_PAGE', {
          data: data,
          category: category,
          page: page
        })
      })
      break;
      case 'tags':
      return api.listByTag(category,page).then((data) => {
        commit('LIST_PAGE', {
          data: data,
          category: category,
          page: page
        })
      })
      break;
      case 'search':
      return api.listBySearch(page).then((data) => {
        commit('LIST_PAGE', {
          data: data,
          category: category,
          page: page
        })
      })
      break;
      case 'top':
      return api.listByTop(page).then((data) => {
        commit('LIST_PAGE', {
          data: data,
          category: category,
          page: page
        })
      })
      break;
      default :
      return api.listByTop(page).then((data) => {
        commit('LIST_PAGE', {
          data: data,
          category: category,
          page: page
        })
      })
    }
  },

  TAGS ({ commit, state }) {
    return api.tags().then((data) => {
      commit('TAGS', data)
    })
  },

  ARCHIVES ({ commit, state }) {
    return api.archives().then((data) => {
      commit('ARCHIVES', data)
    })
  },

  ADMIN_INFO ({ commit, state }) {
    return api.adminInfo().then((data) => {
      commit('ADMIN_INFO', data)
    })
  },

  LIST_BY_ALL ({ commit, state }) {
    const id = state.route.params.page
    return api.listByAll(id).then((data) => {
      commit('LIST_BY_ALL', data)
    })
  },

  async LOGIN ({ commit }, {username, password}) {
    try {
      // 登陆成功后,存储token
      const { data } = await axios.post('/api/login', { username, password })
      commit('SET_USER', data.token)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async LOGOUT ({ commit }) {
    try {
      const { data } = await axios.post('/api/logout')
      // commit('SET_USER', data.token)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async PUBLISH_ARTICLE({commit},content) {
    try {
      const { data } = await axios.post('/api/publish',content)
      // commit('SET_USER', data.token)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  }
}

import axios from 'axios'
import api from '../api'
export default {
  // 渲染组件内的数据
  async nuxtServerInit ({ dispatch }, { req }) {
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
        commit('LIST_PAGE', data)
      })
      break;
      case 'tags':
      return api.listByTag(category,page).then((data) => {
        commit('LIST_PAGE', data)
      })
      break;
      case 'search':
      return api.listBySearch(page).then((data) => {
        commit('LIST_PAGE', data)
      })
      break;
      case 'top':
      return api.listByTop(page).then((data) => {
        commit('LIST_PAGE', data)
      })
      break;
      default :
      return api.listByTop(page).then((data) => {
        commit('LIST_PAGE', data)
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
  }
}

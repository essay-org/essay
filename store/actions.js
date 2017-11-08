import axios from 'axios'
import api from '../api'
export default {
  // 渲染组件内的数据
  async nuxtServerInit ({ dispatch }, { req }) {
    await dispatch('ADMINISTRATOR')
    await dispatch('TAGS')
    await dispatch('ARCHIVES')
  },

  DETAIL_PAGE ({ commit, state }, id) {
    return api.articleData(id).then((data) => {
      commit('DETAIL_PAGE', data)
    })
  },

  LIST_PAGE ({commit, state}, params) {
    // 根据路由获得分类和页数
    let {typeName, category, page} = params
    // console.log(params)
    switch(typeName) {
      case 'archives':
      return api.archiveData(category,page).then((data) => {
        commit('LIST_PAGE', data)
      })
      break;
      case 'tags':
      return api.tagData(category,page).then((data) => {
        commit('LIST_PAGE', data)
      })
      break;
      case 'index':
      return api.postsData(page).then((data) => {
        commit('LIST_PAGE', data)
      })
      break;
      default :
      return api.postsData(page).then((data) => {
        commit('LIST_PAGE', data)
      })
    }
  },

  TAGS ({ commit, state }) {
    return api.tagsData().then((data) => {
      commit('TAGS', data)
    })
  },

  ARCHIVES ({ commit, state }) {
    return api.archivesData().then((data) => {
      commit('ARCHIVES', data)
    })
  },

  ADMINISTRATOR ({ commit, state }) {
    return api.administratorData().then((data) => {
      commit('ADMINISTRATOR', data)
    })
  },

  ARTICLES ({ commit, state }) {
    const id = state.route.params.page
    return api.articlesData(id).then((data) => {
      commit('ARTICLES', data)
    })
  }
}

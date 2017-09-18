import axios from 'axios'
import api from '../api'
export default {
  DETAIL_PAGE ({ commit, state }, id) {
    return api.detailPage(id)
      .then(axios.spread(function (article, administrator, tags, archives) {
        commit('DETAIL_PAGE', {
          article: article,
          administrator: administrator,
          tags: tags,
          archives: archives
        })
      }))
  },

  LIST_PAGE ({ commit, state }) {
    const name = state.route.name
    const id = state.route.params.page
    switch (name) {
      /* eslint-disable no-unreachable */
      case 'index':
        return api.indexPage(id)
          .then(axios.spread(function (posts, administrator, tags, archives) {
            commit('INDEX_PAGE', {
              posts: posts,
              administrator: administrator,
              tags: tags,
              archives: archives
            })
          }))
        break
      case 'category':
        let tag = state.route.params.change
        let reg = new RegExp('[\u4E00-\u9FFF]+', 'g')
        if (reg.test(tag)) {
          tag = encodeURI(tag)
        }
        return api.articlesByTag(tag, id)
          .then(axios.spread(function (articlesByTag, administrator, tags, archives) {
            commit('ARTICLES_BY_TAG', {
              articlesByTag: articlesByTag,
              administrator: administrator,
              tags: tags,
              archives: archives
            })
          }))
        break
      case 'archive':
        let date = state.route.params.change
        return api.articlesByArchive(date, id)
          .then(axios.spread(function (articlesByArchive, administrator, tags, archives) {
            commit('ARTICLES_BY_ARCHIVE', {
              articlesByArchive: articlesByArchive,
              administrator: administrator,
              tags: tags,
              archives: archives
            })
          }))
        break
      case 'search':
        let q = state.route.params.change
        return api.articlesBySearch(q, id)
          .then(axios.spread(function (articlesBySearch, administrator, tags, archives) {
            commit('ARTICLES_BY_SEARCH', {
              articlesBySearch: articlesBySearch,
              administrator: administrator,
              tags: tags,
              archives: archives
            })
          }))
        break
    }
  },

  TAGS ({ commit, state }) {
    return api.tags().then((data) => {
      commit('TAGS', data)
    })
  },

  ADMINISTRATOR ({ commit, state }) {
    return api.administrator().then((data) => {
      commit('ADMINISTRATOR', data)
    })
  },

  ARTICLES ({ commit, state }) {
    const id = state.route.params.page
    return api.articles(id).then((data) => {
      commit('ARTICLES', data)
    })
  }
}

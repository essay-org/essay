export default {

  LIST_PAGE (state, data) {
    state.articleList = data.data.result
    state.total = data.data.total
  },

  ARTICLE_DETAIL (state, data) {
    state.articleDetail = data.data.result[0]
  },

  TAGS (state, data) {
    state.tags = data.data.result
  },

  ARCHIVES (state, data) {
    state.archives = data.data.result
  },

  ADMIN_INFO (state, data) {
    state.administrator = data.data.result[0]
  },

  LIST_BY_ALL(state, data) {
    state.articles = data.data
  }
}

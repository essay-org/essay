export default {
  LIST_PAGE (state, result) {
    if (typeof result === 'object') {
      state.articleList = result.data.data.result
      state.total = result.data.data.total
      state.category = result.category
      state.page = result.page
    }
  },

  ARTICLE_DETAIL (state, data) {
    state.articleDetail = data.result
  },

  TAGS (state, data) {
    state.tags = data.result
  },

  ARCHIVES (state, data) {
    state.archives = data.result
  },

  ADMIN_INFO (state, data) {
    state.administrator = data.result
  },

  LIST_BY_ALL (state, data) {
    state.articles = data.result
    state.total = data.total
  },

  SET_USER (state, token) {
    state.token = token
  },

  STATUS (state, data) {
    state.status = data
  }
}

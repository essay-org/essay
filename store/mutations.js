export default {

  LIST_PAGE (state, result) {
    if(typeof result == 'object'){
      let { category, page, data} = result
      state.articleList = result.data.data.result
      state.total = result.data.data.total
      state.category = category
      state.page = page || 1
    }
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
  },

  SET_USER(state, token) {
    state.authUser = token
  }
}

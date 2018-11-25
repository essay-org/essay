export default {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_GITHUB_TOKEN(state, token){
    state.githubToken = token
  },
  SET_USER(state, data) {
    state.user = data.data
  },
  SET_ARTICLES(state, data) {
    state.articles = data.data
    state.total = data.total
  },
  SET_STICK_ARTICLES(state, data) {
    state.stickArticles = data.data
  },
  SET_ARTICLE_DETAIL(state, data) {
    state.articleDetail = data.data
  },
  SET_TAGS(state, data) {
    state.tags = data.data
  },
  SET_TAG_ARTICLES(state, data) {
    state.tagArticles = data.data
    state.total = data.total
  },
  SET_SEARCH(state, data) {
    state.searchArticles = data.data
    state.total = data.total
  },
  SET_DRAFTS(state, data) {
    state.drafts = data.data
    state.total = data.total
  }
}

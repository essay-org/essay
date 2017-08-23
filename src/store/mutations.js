export default {

  INDEXPAGE (state, data) {
    state.articleList = data.posts.data.result
    state.total = data.posts.data.total
    state.administrator = data.administrator.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  DETAILPAGE (state, data) {
    state.articleDetail = data.article.data.result[0]
    state.administrator = data.administrator.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  ARTICLESBYTAG (state, data) {
    state.articleList = data.articlesByTag.data.result
    state.total = data.articlesByTag.data.total
    state.administrator = data.administrator.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  ARTICLESBYSEARCH (state, data) {
    state.articleList = data.articlesBySearch.data.result
    state.total = data.articlesBySearch.data.total
    state.administrator = data.administrator.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  ARTICLESBYARCHIVE (state, data) {
    state.articleList = data.articlesByArchive.data.result
    state.total = data.articlesByArchive.data.total
    state.administrator = data.administrator.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  TAGS (state, data) {
    state.tags = data.data.result
  },

  ADMINISTRATOR (state, data) {
    state.administrator = data.data.result[0]
  },

  ARTICLES (state, data) {
    state.articles = data.data
  }
}

import Vue from 'vue'
export default {

  INDEXDATA(state, data) {
    state.articleList = data.articleList.data.result
    state.number = data.articleList.data.number
    state.intro = data.intro.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  ARTICLEDATA(state, data) {
    state.articleDetail = data.article.data.result[0]
    state.intro = data.intro.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },


  BYTAG(state, data) {
    state.articleList = data.byTag.data.result
    state.number = data.byTag.data.number
    state.intro = data.intro.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  SEARCHDATA(state, data) {
    state.articleList = data.searchlist.data.result
    state.number = data.searchlist.data.number
    state.intro = data.intro.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  ARCHIVEDATA(state, data) {
    state.articleList = data.byArchive.data.result
    state.number = data.byArchive.data.number
    state.intro = data.intro.data.result[0]
    state.tags = data.tags.data.result
    state.archives = data.archives.data.result
  },

  GETTAGS(state, data) {
    state.tags = data.data.result
  },

  GETINTRO(state, data) {
    state.intro = data.data.result[0]
  },

  ALLARTICLE(state, data) {
    state.allArticle = data.data
  },

  INFOMATIONS(state, data) {
    console.log(data)
  }
}
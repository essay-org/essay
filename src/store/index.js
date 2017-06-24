import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { indexdata, articledata, bytagdata, searchdata, byarchivedata,getTags } from '../api'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    // 存储全局数据
    state: {
      articleList: [],
      intro: [],
      article: '',
      number: '',
      tags: [],
      byTag: [],
      byTagNumber: '',
      byTagArticle: '',
      searchlist: [],
      archives: [],
      byArchive: [],
      byArchiveNumber: ''
    },
    // 通过异步请求的逻辑在这里
    actions: {
      INDEXDATA({ commit, state }) {
        var id = state.route.params.id;
        return indexdata(id)
          .then(axios.spread(function(articleList, intro, tags, archives) {
            commit('INDEXDATA', {
              articleList: articleList,
              intro: intro,
              tags: tags,
              archives: archives
            })
          }))
      },
      BYTAGDATA({ commit, state }) {
        var tag = state.route.params.tag || '';
        var id = state.route.params.id || '';
        return bytagdata(tag, id)
          .then(axios.spread(function(byTag, intro, tags, archives) {
            commit('BYTAG', {
              byTag: byTag,
              intro: intro,
              tags: tags,
              archives: archives
            })
          }))
      },
      ARTICLEDATA({ commit, state }, id) {
        return articledata(id)
          .then(axios.spread(function(article, intro, tags, archives) {
            commit('ARTICLEDATA', {
              article: article,
              intro: intro,
              tags: tags,
              archives: archives
            })
          }))
      },
      SEARCHDATA({ commit, state }) {
        var info = state.route.params.info
        var id = state.route.params.id
        return searchdata(info, id)
          .then(axios.spread(function(searchlist, intro, tags, archives) {
            commit('SEARCHDATA', {
              searchlist: searchlist,
              intro: intro,
              tags: tags,
              archives: archives
            })
          }))
      },

      ARCHIVEDATA({ commit, state }) {
        var date = state.route.params.date;
        var id = state.route.params.id;
        return byarchivedata(date, id)
          .then(axios.spread(function(byArchive, intro, tags, archives) {
            commit('ARCHIVEDATA', {
              byArchive: byArchive,
              intro: intro,
              tags: tags,
              archives: archives
            })
          }))
      },
      GETTAGS({commit,state}) {
        return getTags().then((data) => {
          commit('GETTAGS',data)
        })
      }
    },
    // 同步更新数据的逻辑
    mutations: {
      LOGIN(state, data) {
        localStorage.setItem('token', data);
      },
      LOGOUT(state, data) {
        localStorage.setItem('token', null);
      },
      INDEXDATA(state, data) {
        state.articleList = data.articleList.data.result
        state.number = data.articleList.data.number
        state.intro = data.intro.data.result[0]
        state.tags = data.tags.data.result
        state.archives = data.archives.data.result
      },
      ARTICLEDATA(state, data) {
        state.article = data.article.data.result[0]
        state.intro = data.intro.data.result[0]
        state.tags = data.tags.data.result
        state.archives = data.archives.data.result
      },


      BYTAG(state, data) {
        state.byTag = data.byTag.data.result
        state.byTagNumber = data.byTag.data.number
        state.intro = data.intro.data.result[0]
        state.tags = data.tags.data.result
        state.archives = data.archives.data.result
      },
      SEARCHDATA(state, data) {

        state.searchlist = data.searchlist.data.result
        state.number = data.searchlist.data.number
        state.intro = data.intro.data.result[0]
        state.tags = data.tags.data.result
        state.archives = data.archives.data.result
      },

      ARCHIVEDATA(state, data) {
        state.byArchive = data.byArchive.data.result
        state.byArchiveNumber = data.byArchive.data.number
        state.intro = data.intro.data.result[0]
        state.tags = data.tags.data.result
        state.archives = data.archives.data.result
      },
      GETTAGS(state,data) {
        state.tags  = data.data.result
      },
      INFOMATIONS(state, data) {
        console.log(data)
      }
    }
  })
}

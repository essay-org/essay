import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { indexdata, articledata, bytagdata,searchdata } from '../api'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    // 存储全局数据
    state: {
      articleList: [],
      intro: [],
      article: '',
      number: '',
      tag: [],
      byTag: [],
      byTagNumber: '',
      byTagArticle: '',
      searchlist:[],
    },
    // 通过异步请求的逻辑在这里
    actions: {
      INDEXDATA({ commit, state }) {
        var id = state.route.params.id;
        return indexdata(id)
          .then(axios.spread(function(articleList, intro, tag) {
            commit('INDEXDATA', {
              articleList: articleList,
              intro: intro,
              tag: tag
            })
          }))
      },
      BYTAGDATA({ commit, state }) {
        var tag = state.route.params.tag || '';
        var id = state.route.params.id || '';
        return bytagdata(tag, id)
          .then(axios.spread(function(byTag, intro, tag) {
            commit('BYTAG', {
              byTag: byTag,
              intro: intro,
              tag: tag
            })
          }))
      },
      ARTICLEDATA({ commit, state }, id) {
        return articledata(id)
          .then(axios.spread(function(article, intro, tag) {
            commit('ARTICLEDATA', {
              article: article,
              intro: intro,
              tag: tag
            })
          }))
      },
      SEARCHDATA({ commit, state }) {
        var info = state.route.params.info
        var id = state.route.params.id
        return searchdata(info,id)
          .then(axios.spread(function(searchlist, intro, tag) {
            commit('SEARCHDATA', {
              searchlist: searchlist,
              intro: intro,
              tag: tag
            })
          }))
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
        if (data.tag.data.result.length) {
          state.tag = data.tag.data.result[0].tags
        }
      },
      ARTICLEDATA(state, data) {
        state.article = data.article.data.result[0]
        state.intro = data.intro.data.result[0]
        if (data.tag.data.result.length) {
          state.tag = data.tag.data.result[0].tags
        }
      },


      BYTAG(state, data) {
        state.byTag = data.byTag.data.result
        state.byTagNumber = data.byTag.data.number
        state.intro = data.intro.data.result[0]
        if (data.tag.data.result.length) {

          state.tag = data.tag.data.result[0].tags
        }
      },
      SEARCHDATA(state,data) {

        state.searchlist = data.searchlist.data.result
        state.number = data.searchlist.data.number
        state.intro = data.intro.data.result[0]
        if (data.tag.data.result.length) {
          state.tag = data.tag.data.result[0].tags
        }
      },
      INFOMATIONS(state, data) {
        console.log(data)
      }
    }
  })
}

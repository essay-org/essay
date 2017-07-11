import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { indexdata, articledata, bytagdata, searchdata, byarchivedata, getTags, allarticle, getIntro } from '../api'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    // 存储全局数据
    state: {
      articleList: [],
      intro: [],
      articleDetail: '',
      number: '',
      tags: [],
      archives: [],
      allArticle: null,
      cookies:null
    },
    // 通过异步请求的逻辑在这里
    actions: {

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

      LISTDATA({ commit, state }) {
        var name = state.route.name;

        switch (name) {
          case 'index':
            var id = state.route.params.page;
            return indexdata(id)
              .then(axios.spread(function(articleList, intro, tags, archives) {
                commit('INDEXDATA', {
                  articleList: articleList,
                  intro: intro,
                  tags: tags,
                  archives: archives
                })
              }))
            break;
          case 'category':
            var tag = state.route.params.change || '';
            var reg = new RegExp("[\u4E00-\u9FFF]+", "g");
            if (reg.test(tag)) {
              tag = encodeURI(tag)
            }
            var id = state.route.params.page || '';
            return bytagdata(tag, id)
              .then(axios.spread(function(byTag, intro, tags, archives) {
                commit('BYTAG', {
                  byTag: byTag,
                  intro: intro,
                  tags: tags,
                  archives: archives
                })
              }))
            break;
          case 'archive':
            var date = state.route.params.change || '';
            var id = state.route.params.page || '';
            return byarchivedata(date, id)
              .then(axios.spread(function(byArchive, intro, tags, archives) {
                commit('ARCHIVEDATA', {
                  byArchive: byArchive,
                  intro: intro,
                  tags: tags,
                  archives: archives
                })
              }))
            break;
          case 'search':
            var info = state.route.params.change
            var id = state.route.params.page
            return searchdata(info, id)
              .then(axios.spread(function(searchlist, intro, tags, archives) {
                commit('SEARCHDATA', {
                  searchlist: searchlist,
                  intro: intro,
                  tags: tags,
                  archives: archives
                })
              }))
            break;
        }
      },

      GETTAGS({ commit, state }) {
        return getTags().then((data) => {
          commit('GETTAGS', data)
        })
      },
      GETINTRO({ commit, state }) {
        return getIntro().then((data) => {
          commit('GETINTRO', data)
        })
      },
      // 后台数据
      ALLARTICLE({ commit, state }) {
        var id = state.route.params.page;
        return allarticle(id).then((data) => {
          commit('ALLARTICLE', data)
        })
      },
    },
    // 同步更新数据的逻辑
    mutations: {
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
  })
}

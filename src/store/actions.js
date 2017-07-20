import Vue from 'vue'
import axios from 'axios'
import api from '../api'
export default {
  ARTICLEDATA({ commit, state }, id) {
    return api.articledata(id)
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
        return api.indexdata(id)
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
        return api.bytagdata(tag, id)
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
        return api.byarchivedata(date, id)
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
        return api.searchdata(info, id)
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
    return api.tags().then((data) => {
      commit('GETTAGS', data)
    })
  },

  GETINTRO({ commit, state }) {
    return api.intro().then((data) => {
      commit('GETINTRO', data)
    })
  },

  // 后台数据
  ALLARTICLE({ commit, state }) {
    var id = state.route.params.page;
    return api.allarticle(id).then((data) => {
      commit('ALLARTICLE', data)
    })
  },
}
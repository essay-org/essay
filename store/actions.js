import axios from 'axios'
const serverAxios = axios.create({
  baseURL: 'http://127.0.0.1:8080/api'
})

export default {
  async nuxtServerInit ({ dispatch, commit }, { req, res }) {
    if (req.cookies && req.cookies.token) {
      // 存储token
      commit('SET_USER', req.cookies.token)
    }
    // 初始化组件内的数据
    await dispatch('ADMIN_INFO')
    await dispatch('TAGS')
    await dispatch('ARCHIVES')
  },

  async ARTICLE_DETAIL ({ commit, state }, id) {
    const { data } = await serverAxios.get(`/article?id=${id}`)
    commit('ARTICLE_DETAIL', data)
  },

  async DEL_ARTICLE ({commit, state}, id) {
    const { data } = await serverAxios.delete(`/article?id=${id}`)
    commit('STATUS', data)
  },

  async LIST_PAGE ({ commit, state }, params) {
    let {typeName = '', category = '', page = 1} = params
    // category可能有中文，所以编码
    category = encodeURI(category)
    switch (typeName) {
      case 'archives':
        const archiveData = await serverAxios.get(`/archive?date=${category}&limit=15&page=${page}`)
        commit('LIST_PAGE', {
          data: archiveData,
          category: decodeURI(category),
          page
        })
        break
      case 'tags':
        const tagData = await serverAxios.get(`/tag?tag=${category}&limit=15&page=${page}`)
        commit('LIST_PAGE', {
          data: tagData,
          category: decodeURI(category),
          page
        })
        break
      case 'search':
        /* 对于搜索来说，category相当于关键字 */
        const searchData = await serverAxios.get(`/search?q=${category}&limit=15&page=${page}`)
        commit('LIST_PAGE', {
          data: searchData,
          category: decodeURI(category),
          page
        })
        break
      case 'top':
        const postData = await serverAxios.get(`/posts?limit=15&page=${page}`)
        commit('LIST_PAGE', {
          data: postData,
          category: decodeURI(category),
          page
        })
        break
      default:
        break
    }
  },
  async TAGS ({ commit, state }) {
    const { data } = await serverAxios.get('/tags')
    commit('TAGS', data)
  },

  async ARCHIVES ({ commit, state }) {
    const { data } = await serverAxios.get('/archives')
    commit('ARCHIVES', data)
  },

  async ADMIN_INFO ({ commit, state }) {
    const { data } = await serverAxios.get('/administrator')
    commit('ADMIN_INFO', data)
  },

  async LIST_BY_ALL ({ commit, state }, page) {
    const { data } = await serverAxios.get(`/articles?limit=15&page=${page}`)
    commit('LIST_BY_ALL', data)
  },
  /* 需要进行验证才能操作的请求 */
  async PUBLISH_ARTICLE ({ commit, state }, content) {
    try {
      const { data } = await serverAxios.post('/article', content, {
        headers: {
          token: state.token
        }
      })
      commit('STATUS', data)
    } catch (error) {
      throw error
    }
  },
  async UPDATE_PASSWORD ({ commit, state }, password) {
    const { data } = await serverAxios.put('/password', password, {
      headers: {
        token: state.token
      }
    })
    commit('STATUS', data)
  },
  async ADMIN ({commit, state},info) {
    const { data } = await serverAxios.put('/administrator', info, {
      headers: {
        token: state.token
      }
    })
    commit('STATUS', data)
  },
  async SET_AVATAR ({commit, state},image) {
    const { data } = await serverAxios.post('/avatar', image, {
      headers: {
        'Content-Type': 'multipart/form-data',
        token: state.token
      }
    })
    commit('STATUS', data)
  },

  /* 向node服务发送请求 */
  async LOGIN ({ commit }, userInfo) {
    try {
      // 登陆成功后,会得到token
      const { data } = await axios.post('/api/login', userInfo)
      commit('STATUS', data)
    } catch (error) {
      throw error
    }
  },
  async LOGOUT ({ commit }) {
    try {
      const { data } = await axios.post('/api/logout')
      commit('STATUS', data)
    } catch (error) {
      throw error
    }
  }
}

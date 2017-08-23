import axios from 'axios'
// 首页文章列表
function posts (id = 1) {
  return axios.get(`/posts?limit=15&page=${id}`)
}

// 通过标签获取文章列表
function tag (params = '', id = 1) {
  return axios.get(`/tag?tag=${params}&limit=15&page=${id}`)
}

// 通过检索标题获取文章列表
function search (q = '', id = 1) {
  return axios.get(`/search?q=${q}&limit=15&page=${id}`)
}

// 通过归档日期获取文章列表
function archive (date = '', id = 1) {
  return axios.get(`/archive?date=${date}&limit=15&page=${id}`)
}

// 草稿和已发布文章列表
function articles (id = 1) {
  return axios.get(`/articles?limit=15&page=${id}`)
}

// 管理员信息
function administrator () {
  return axios.get('/administrator')
}

// 标签列表信息
function tags () {
  return axios.get('/tags')
}

// 归档信息
function archives () {
  return axios.get('/archives')
}

// 文章详情
function article (id) {
  return axios.get(`/article?id=${id}`)
}

/* ============================= */

// 首页 
function indexPage (id) {
  return axios.all([posts(id), administrator(), tags(), archives()])
}

// 文章详情页
function detailPage (id) {
  return axios.all([article(id), administrator(), tags(), archives()])
}

// 通过标签获取文章列表
function articlesByTag (params, id) {
  return axios.all([tag(params, id), administrator(), tags(), archives()])
}

// 通过搜索获取文章列表
function articlesBySearch (q, id) {
  return axios.all([search(q, id), administrator(), tags(), archives()])
}

// 通过归档获取文章列表
function articlesByArchive (date, id) {
  return axios.all([archive(date, id), administrator(), tags(), archives()])
}

export default { indexPage, detailPage, articlesByTag, articlesBySearch, articlesByArchive, articles, tags, administrator }

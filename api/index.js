import axios from 'axios'
const axiosGetData = axios.create({
  baseURL: 'http://127.0.0.1:8080/api'
})
// axios.defaults.baseURL = ''
// 首页文章列表
function listByTop (page = 1) {
  return axiosGetData.get(`/posts?limit=15&page=${page}`)
}

// 通过标签获取文章列表
function listByTag (category = '', page = 1) {
  return axiosGetData.get(`/tag?tag=${category}&limit=15&page=${page}`)
}

// 通过检索标题获取文章列表
function listBySearch (info = '', page = 1) {
  return axiosGetData.get(`/search?q=${info}&limit=15&page=${page}`)
}

// 通过归档日期获取文章列表
function listByArchive (category = '', page = 1) {
  return axiosGetData.get(`/archive?date=${category}&limit=15&page=${page}`)
}

// 草稿和已发布文章列表
function listByAll (page = 1) {
  return axiosGetData.get(`/articles?limit=15&page=${page}`)
}

// 文章详情
function articleDetail (id) {
  return axiosGetData.get(`/article?id=${id}`)
}

// 管理员信息
function adminInfo () {
  return axiosGetData.get('/administrator')
}

// 标签列表信息
function tags () {
  return axiosGetData.get('/tags')
}

// 归档信息
function archives () {
  return axiosGetData.get('/archives')
}

export default {
  listByTop,
  listByTag,
  listBySearch,
  listByArchive,
  listByAll,
  articleDetail,
  adminInfo,
  tags,
  archives
}

import axios from 'axios'

// 首页文章列表
function index(id) {
	var id = id ? id : 1;
  return axios.get(`/people?limit=15&page=${id}`)
}

// 通过标签获取文章列表
function bytag(params,id) {
  var params = params ? params : '';
  var id = id ? id : 1;
  return axios.get(`/bytag?tag=${params}&limit=15&page=${id}`)
}

// 通过检索标题获取文章列表
function search(info) {
  var info = info ? info : '';
  var id = id ? id : 1;
  return axios.get(`/search?info=${info}&limit=15&page=${id}`)
}

// 通过归档日期获取文章列表
function byarchive(date,id) {
  var date = date ? date : '';
  var id = id ? id : 1;
  return axios.get(`/byarchive?date=${date}&limit=15&page=${id}`)
}

// 草稿和已发布文章列表
function allarticle(id) {
  return axios.get(`/allarticle?limit=15&page=${id}`)
}

// 管理员信息
function intro() {
  return axios.get('/userinfo')
}

// 标签列表信息
function tags() {
  return axios.get('/tag')
}

// 归档信息
function archives() {
  return axios.get('/archive')
}

// 文章详情
function article(id) {
  return axios.get(`/article?id=${id}`)
}

/* ============================= */

// 首页 
function indexdata(id) {
  return axios.all([index(id), intro(),tags(),archives()])
}

// 文章详情页
function articledata(id) {
  return axios.all([article(id), intro(),tags(),archives()])
}

// 标签列表页
function bytagdata(params,id) {
  return axios.all([bytag(params,id), intro(),tags(),archives()])
}

// 搜索
function searchdata(info,id) {
  return axios.all([search(info,id), intro(),tags(),archives()])
}

// 归档列表页
function byarchivedata(date,id) {
  return axios.all([byarchive(date,id), intro(),tags(),archives()])
}

export { indexdata, articledata, bytagdata, searchdata, byarchivedata, allarticle, tags,intro }
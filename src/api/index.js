import axios from 'axios'

// 首页文章列表
function index(id) {
	var id = id ? id : 1;
  return axios.get(`/people?limit=15&page=${id}`)
}

function article(id) {
  return axios.get(`/article?id=${id}`)
}

// 通过标签获取文章列表
function bytag(params,id) {
  var params = params ? params : '';
  var id = id ? id : 1;
  return axios.get(`/bytag?tag=${params}&limit=15&page=${id}`)
}

// 标签列表
function tags() {
  return axios.get('/tag')
}

// 管理员信息
function intro() {
  return axios.get('/userinfo')
}

function search(info) {
  var info = info ? info : '';
  var id = id ? id : 1;
  return axios.get(`/search?info=${info}&limit=15&page=${id}`)
}

// 归档信息
function archives() {
  return axios.get('/archive')
}

function byarchive(date,id) {
  var date = date ? date : '';
  var id = id ? id : 1;
  return axios.get(`/byarchive?date=${date}&limit=15&page=${id}`)
}

/* ============================ */
export function getTags() {
  return axios.get('/tag')
}

export function getIntro() {
  return axios.get('/userinfo')
}

export function allarticle(id) {
  return axios.get(`/allarticle?limit=15&page=${id}`)
}

/* ============================= */
// 文章列表 
export function indexdata(id) {
  return axios.all([index(id), intro(),tags(),archives()])
}

// 文章详情
export function articledata(id) {
  return axios.all([article(id), intro(),tags(),archives()])

}

// 根据标签获取文章
export function bytagdata(params,id) {
  return axios.all([bytag(params,id), intro(),tags(),archives()])
}

// 搜索
export function searchdata(info,id) {
  return axios.all([search(info,id), intro(),tags(),archives()])
}

// 归档文章
export function byarchivedata(date,id) {
  return axios.all([byarchive(date,id), intro(),tags(),archives()])
}

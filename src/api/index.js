import axios from 'axios'
let user = localStorage.getItem('token')

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
function tag() {
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
/* ============================= */
// 文章列表 
export function indexdata(id) {
  return axios.all([index(id), intro(),tag()])
}

// 文章详情
export function articledata(id) {
  return axios.all([article(id), intro(),tag()])

}

// 根据标签获取文章
export function bytagdata(params,id) {
  return axios.all([bytag(params,id), intro(),tag()])
}

// 搜索
export function searchdata(info,id) {
  return axios.all([search(info,id), intro(),tag()])
}
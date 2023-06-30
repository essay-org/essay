self.addEventListener('fetch', function (e) {
  console.log('正在请求：' + e.request.url);
});

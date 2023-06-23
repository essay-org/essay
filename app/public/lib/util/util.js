/* eslint-disable no-var */

window.$util = {
  parseCookie() {
    var cookies = {};
    var cookieString = document.cookie;
    if (cookieString) {
      var cookiePairs = cookieString.split(';');
      for (let i = 0; i < cookiePairs.length; i++) {
        var pair = cookiePairs[i].trim().split('=');
        var name = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1] || '');
        cookies[name] = value;
      }
    }
    return cookies;
  },
  getCookie(key) {
    return this.parseCookie()[key] || '';
  },
};

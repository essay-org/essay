<template>
  <div class="about container markdown-body">
    <h4>关于VueBlog</h4>
    <p>该项目写于2017年5月，初衷只是为了解决公司项目的SEO问题，后来发现成熟的解决方案太少，当时仅有Vue官方的hackernews可以参考，于是决定做一个完整的开源项目，帮助自己的同时也能让有同样需求的朋友少踩一些坑。Vue在2017年很火，基于Vue开源的blog项目很多，但很多都是练手项目，作者已不再维护，VueBlog我想把它作为自己的博客，所以一直在保持更新，当Nuxt.js发布1.0稳定版后，我第一时间对VueBlog进行了升级，服务端用koa和mongoose重写了API，前端用Nuxt进行了重构，由于没有写单元测试所以该项目仅供大家学习交流，不建议用于线上。项目开发过程中也遇到了不少问题，参考了很多优秀的开源项目，仅markdown编辑器我就倒腾了大半月，原因在于很多编辑器不支持Vue服务端渲染，也没法上传图片，这太蛋疼了，就倒腾了个简单的<a href="https://github.com/vuetop/top-editor" target="_blank">top-editor</a>。该项目以后也会保持更新，并且不会写的过于复杂，更多的功能会以插件的形式开发，希望VueBlog能成为一个小而美的现代化博客应用。</p>

    <h4>关于作者</h4>
    <p>一个热爱开源的90后小伙，海贼迷，业余爱好看书和跑步，目前在杭州工作。高中接触互联网，只因为当时的一个站长梦，误打误撞进入了互联网行业，高中毕业后开始倒腾网站，大学期间正式学习前端，从此热爱上了互联网，梦想着能做一款优秀的产品，这也是我学习的动力。</p>

    <h4>联系</h4>
    <p>邮箱：qq22337383@gmail.com （备用：22337383@qq.com）</p>
  </div>
</template>
<script>
export default {
  head () {
    return {
      title: '关于 - VueBlog'
    }
  }
}
</script>

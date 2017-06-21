<template>
  <div id="app">
    <transition>
        <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<style lang="scss">
@import '../static/normalize/normalize.css';
@import '../static/simplemde/simplemde.css';
@import '../static/github-markdown/github-markdown.css';

@import './assets/styles/global.scss';
@import './assets/styles/blog.scss';
</style>

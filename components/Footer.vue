<template>
  <footer class="container footer">
    <div class="copy">
      <div class="licensed">Licensed under <a href="https://choosealicense.com/licenses/gpl-3.0/">GPL-3.0</a> license.</div>
      <div class="powered">Powered by <a href="https://github.com/wmui/vueblog">VueBlog</a>. Theme by <a href="https://github.com/wmui">wmui</a></div>
    </div>
  </footer>
</template>
<style lang="scss">
@import '~assets/css/var.scss';
.footer {
  border-top: 1px solid $Border;
  color: #C8C9CA;
  margin: auto;
  .copy {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 0 18px;
  }
}

</style>
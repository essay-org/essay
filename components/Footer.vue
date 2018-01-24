<template>
  <footer class="footer">
    <div class="footer-copy">
      <p class="copy-licensed">Licensed under <a href="https://choosealicense.com/licenses/gpl-3.0/">GPL-3.0</a> license.
      </p>
      <p class="copy-powered">Powered by <a href="https://github.com/wmui/vueblog">VueBlog</a>. Theme by <a href="https://github.com/wmui">wmui</a></p>
    </div>
  </footer>
</template>
<style lang="postcss">
  .footer {
    border-top: 1px solid #e4e4e4;
    color: #999;
    & .footer-copy {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      padding: 0 18px;
    }
  }
</style>

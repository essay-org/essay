<template>
  <div v-comment="id"></div>
</template>
<script>
import 'gitment/style/default.css'
import Gitment from 'gitment'
export default {
  props: ['id'],
  directives: {
    comment: {
      bind: function(el, binding) {
        const gitment = new Gitment({
          id: binding.value + '',
          owner: 'Your GitHub ID',
          repo: 'The repo to store comments',
          oauth: {
            client_id: 'Your client ID',
            client_secret: 'Your client secret',
          },
        })
        gitment.render(el)
      }
    }
  }
}
</script>
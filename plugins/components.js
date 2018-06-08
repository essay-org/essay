import Vue from 'vue'
import TopTip from '../components/top-tip.vue'
import TopList from '../components/top-list.vue'
import TopComment from '../components/top-comment.vue'
import TopPreview from 'top-editor/src/lib/TopPreview.vue'
import TopEditor from 'top-editor/src/lib/TopEditor.vue'

const components = { TopTip, TopList, TopComment, TopPreview, TopEditor }

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

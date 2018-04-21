import Vue from 'vue'
import TopTip from '../components/top-tip.vue'
import TopLists from '../components/top-lists.vue'
import TopComments from '../components/top-comments.vue'
import TopPreview from 'top-editor/src/lib/TopPreview.vue'
import TopEditor from 'top-editor/src/lib/TopEditor.vue'

const components = { TopTip, TopLists, TopComments, TopPreview, TopEditor }

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

import Vue from 'vue'
// import Comment from '../components/comment.vue'
import EditorEdit from '../components/editor-edit.vue'
import EditorPreview from '../components/editor-preview.vue'
import BlogList from '../components/blog-list.vue'
import BlogNav from '../components/blog-nav.vue'

[EditorEdit, EditorPreview, BlogList, BlogNav].forEach((component) => {
  Vue.component(component.name, component)
})

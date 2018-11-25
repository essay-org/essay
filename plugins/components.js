import Vue from 'vue'
import BlogList from '../components/blog-list.vue'
import BlogComment from '../components/blog-comment.vue'

const components = [
  BlogList,
  BlogComment,
]

components.forEach(component => {
  Vue.component(component.name, component)
})

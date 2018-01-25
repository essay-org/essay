import Vue from 'vue'
import Tip from '../components/Tip.vue'

const components = { Tip }

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

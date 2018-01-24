import Vue from 'vue'
import Tip from '../components/Tip.vue'
// Vue.component('Tip', Tip)
const components = { Tip }

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

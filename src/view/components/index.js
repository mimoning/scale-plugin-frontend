import Vue from 'vue'

import Hello from './Hello.vue'

const Components = {
  Hello
}

const components = {}

Object.keys(Components).forEach(key => {
  components[key] = Vue.component(key, Components[key])
})

export default components

import Vue from 'vue'
// components
import EmptyState from './empty-state'
import RuleList from './rule-list'
import ServiceList from './service-list'

const Components = {
  EmptyState,
  RuleList,
  ServiceList
}

const components = {}

Object.keys(Components).forEach(key => {
  components[key] = Vue.component(key, Components[key])
})

export default components

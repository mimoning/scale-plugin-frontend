import Vue from 'vue'
// components
import AlertDialog from './dialogs/alert-dialog'
import EmptyState from './empty-state'
import LogList from './log-list'
import RuleList from './rule-list'
import ServiceList from './service-list'

const Components = {
  AlertDialog,
  EmptyState,
  LogList,
  RuleList,
  ServiceList
}

const components = {}

Object.keys(Components).forEach(key => {
  components[key] = Vue.component(key, Components[key])
})

export default components

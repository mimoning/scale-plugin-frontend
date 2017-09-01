import Vue from 'vue'
// components
import AlertDialog from './dialogs/alert-dialog'
import BindList from './bind-list'
import EmptyState from './empty-state'
import Loading from './loading'
import LogList from './log-list'
import RuleList from './rule-list'

const Components = {
  AlertDialog,
  BindList,
  EmptyState,
  Loading,
  LogList,
  RuleList
}

const components = {}

Object.keys(Components).forEach(key => {
  components[key] = Vue.component(key, Components[key])
})

export default components

import { RuleOrigin } from './rule.factory'

function getRules () {
  return $http.get('/rules')
    .then(res => res.data)
}

function addRule (params) {
  return $http.post('/rules', new RuleOrigin(params))
    .then(res => res.data)
}

function delRule (name) {
  return $http.delete(`/rules/${name}`)
    .then(res => res.data)
}

function modifyRule (name, params) {
  return $http.put(`/rules/${name}`, new RuleOrigin(params))
    .then(res => res.data)
}

function enableRule (name) {
  return $http.post(`/rules/${name}/enable`)
    .then(res => res.data)
}

function disableRule (name) {
  return $http.post(`/rules/${name}/disable`)
    .then(res => res.data)
}

export default {
  addRule,
  delRule,
  disableRule,
  enableRule,
  getRules,
  modifyRule
}

import { RuleOrigin } from './rule.factory'

function getRules () {
  return $http.get('/api/rules')
    .then(res => res.data)
}

function addRule (params) {
  return $http.post('/api/rules', new RuleOrigin(params))
    .then(res => res.data)
}

function delRule (name) {
  return $http.delete(`/api/rules/${name}`)
}

function modifyRule (name, params) {
  return $http.put(`/api/rules/${name}`, new RuleOrigin(params))
}

export default {
  addRule,
  delRule,
  getRules,
  modifyRule
}

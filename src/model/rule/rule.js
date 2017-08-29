const RULES = [
  {
    name: 'test',
    condition: 'cpu: 60%',
    step: 3,
    limit: 10,
    scan: '30s',
    service: '2048_game'
  }
]

function getRules () {
  return Promise.resolve(RULES)
}

function addRule (params) {
  return new Promise(resolve => {
    RULES.push(params)
    resolve()
  })
}

function delRule (name) {
  return new Promise(resolve => {
    _.remove(RULES, rule => rule.name === name)
    resolve()
  })
}

export default {
  getRules,
  addRule,
  delRule
}

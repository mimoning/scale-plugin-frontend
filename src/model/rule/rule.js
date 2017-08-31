const RULES = [
  {
    name: 'test',
    condition: {
      logic: 1,
      cpu: 60
    },
    step: 3,
    limit: 10,
    scan: 30,
    service: '2048_game'
  },
  {
    name: 'test1',
    condition: {
      logic: 0,
      cpu: 60,
      mem: 20
    },
    step: 3,
    limit: 10,
    scan: 30,
    service: '2048_game'
  },
  {
    name: 'test2',
    condition: {
      logic: 1,
      cpu: 60,
      mem: 30
    },
    step: 3,
    limit: 10,
    scan: 30,
    service: '2048_game'
  },
  {
    name: 'test3',
    condition: {
      logic: 1,
      cpu: 60
    },
    step: 3,
    limit: 10,
    scan: 30,
    service: '2048_game'
  },
  {
    name: 'test4',
    condition: {
      logic: 1,
      cpu: 60
    },
    step: 3,
    limit: 10,
    scan: 30,
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

function modifyRule (rule, params) {
  return new Promise(resolve => {
    _.chain(RULES)
     .find(r => r.name === rule)
     .merge(params)
     .value()
    resolve()
  })
}

export default {
  addRule,
  delRule,
  getRules,
  modifyRule
}

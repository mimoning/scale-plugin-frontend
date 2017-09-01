import defineProps from '../util'

// 生成 condition
function generateCondition (data) {
  const logic = data.operator === 'AND' ? 1 : 0
  const condition = { logic }
  // 这边数据有点搞…如果直接就是单项条件的话，直接就是单个条件的数据
  if (data.resource && data.threshold) {
    condition[data.resource.toLowerCase()] = data.threshold
    return condition
  }
  // 如果有多个条件的话，就需要把条件内部的东西遍历出来
  _.forEach(data, (v, k) => {
    if (k.includes('condition') && v.threshold) {
      condition[v.resource.toLowerCase()] = v.threshold
    }
  })
  return condition
}

class Rule {
  constructor (data) {
    defineProps(this, {
      name: data.name,
      condition: generateCondition(data.condition),
      step: data.step,
      limit: data.max_replicas,
      scan: data.interval,
      service: data.service_name,
      enable: data.enable
    })
  }
}

// 原始数据格式
class RuleOrigin {
  constructor (data) {
    defineProps(this, {
      action: 'scale_out'
    })
    this.name = _.get(data, 'name', '')
    this.interval = _.get(data, 'interval')
    this.step = _.get(data, 'step')
    this.service_name = _.get(data, 'service', '')
    this.condition = this._conditions(data.condition)
  }
  _conditions (cons) {
    if (_.keys(cons).length > 2) {
      const operator = cons.logic ? 'AND' : 'OR'
      const conditionA = this._condition('CPU', cons.cpu)
      const conditionB = this._condition('MEM', cons.mem)
      return {
        operator,
        condition_a: conditionA,
        condition_b: conditionB
      }
    }
    const params = cons.cpu ? ['CPU', cons.cpu] : ['MEM', cons.mem]
    return this._condition(...params)
  }
  _condition (key, value) {
    return {
      operator: '>',
      threshold: value,
      resource: key
    }
  }
}

export {
  Rule,
  RuleOrigin
}

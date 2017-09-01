import defineProps from '../util'

class Bind {
  constructor (data) {
    defineProps(this, {
      service: data.service_name,
      rule: data.rule_name,
      lbMode: data.lb_mode === 'F5' ? 'F5 负载均衡' : ''
    })
  }
}

export default Bind

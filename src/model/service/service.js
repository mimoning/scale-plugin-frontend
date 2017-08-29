const SERVICES = [
  {
    name: '2048_game',
    bindRule: 'test',
    lbMode: 'F5 负载均衡'
  }
]

function getServices () {
  return Promise.resolve(SERVICES)
}

export default {
  getServices
}

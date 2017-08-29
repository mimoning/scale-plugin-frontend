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

function unbindRule (serv) {
  console.log(serv)
  return new Promise(resolve => {
    _.remove(SERVICES, service => service.name === serv.name)
    resolve()
  })
}

export default {
  getServices,
  unbindRule
}

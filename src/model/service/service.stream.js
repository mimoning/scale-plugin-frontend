import { hub$$ } from '../hub'
import serviceApi from './service'

const services$$ = hub$$.filter(jobs => jobs.includes('service'))
const servicesVm$$ = new Rx.BehaviorSubject().filter(v => v)

services$$.concatMap(serviceApi.getServices)
  .map(servs => _.map(servs, serv => _.clone(serv)))
  .subscribe(servicesVm$$)

servicesVm$$.subscribe(res => {
  console.log(res)
  if (res) {
    console.log('服务个数 ', res.length)
  }
})

export {
  servicesVm$$
}

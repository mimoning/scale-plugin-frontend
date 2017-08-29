import { hub$$ } from '../hub'
import serviceApi from './service'

const services$$ = hub$$.filter(jobs => jobs.includes('service'))
const servicesVm$$ = new Rx.BehaviorSubject()

services$$.concatMap(serviceApi.getServices)
  .subscribe(servicesVm$$)

servicesVm$$.subscribe(res => {
  if (res) {
    console.log('服务个数 ', res.length)
  }
})

export {
  servicesVm$$
}

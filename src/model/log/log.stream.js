import { hub$$ } from '@/model/hub'
import logApi from './log'

const logs$$ = hub$$.filter(jobs => jobs.includes('log'))
const logsVm$$ = new Rx.BehaviorSubject()

logs$$.concatMap(() => logApi.getLogs())
  .map(logs => _.clone(logs))
  .subscribe(logsVm$$)

logsVm$$.subscribe(logs => {
  if (logs) {
    console.log('共有 ', logs.length, ' 条日志')
  }
})

export {
  logsVm$$
}

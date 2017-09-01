import { hub$$ } from '../hub'
import bindApi from './bind'
import Bind from './bind.factory'

const binds$$ = hub$$.filter(jobs => jobs.includes('bind'))
const bindsVm$$ = new Rx.BehaviorSubject()

binds$$
  .concatMap(() => bindApi.getBinds())
  .map(binds => _.map(binds, bind => new Bind(bind)))
  .subscribe(bindsVm$$)

export {
  bindsVm$$
}

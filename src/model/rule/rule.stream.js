import { hub$$ } from '../hub'
import ruleApi from './rule'
import { Rule } from './rule.factory'

const rules$$ = hub$$.filter(jobs => jobs.includes('rule'))
const operator$$ = new Rx.Subject()
  .filter(v => v)
  .concatMap(({rule, opt}) => ruleApi[opt](rule))
const rulesVm$$ = new Rx.BehaviorSubject()

rules$$.concatMap(ruleApi.getRules)
  .catch(() => Rx.Observable.of([]))
  .map(rules =>
    _.map(rules, rule => new Rule(rule))
  )
  .subscribe(rulesVm$$)

function addRule (rule) {
  operator$$.next({rule, opt: 'addRule'})
  return operator$$.first()
}

function delRule (rule) {
  operator$$.next({rule, opt: 'delRule'})
  return operator$$.first()
}

operator$$
  .subscribe(() => hub$$.next('all'))

rulesVm$$.subscribe(res => {
  // console.log(res)
  if (res) {
    console.log('共有 ', res.length, ' 条规则')
  }
})

export {
  rulesVm$$,
  addRule,
  delRule
}

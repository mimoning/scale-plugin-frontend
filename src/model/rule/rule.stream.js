import { hub$$ } from '../hub'
import ruleApi from './rule'
import { Rule } from './rule.factory'

const rules$$ = hub$$.filter(jobs => jobs.includes('rule'))
const operator$$ = new Rx.Subject().switchMap(({rule, opt}) => ruleApi[opt](rule))
const rulesVm$$ = new Rx.BehaviorSubject()

rules$$.concatMap(ruleApi.getRules)
  .map(rules => {
    console.log(rules)
    return _.map(rules, rule => new Rule(rule))
  })
  .subscribe(rulesVm$$)

function addRule (rule) {
  operator$$.next({rule, opt: 'addRule'})
}

function delRule (rule) {
  operator$$.next({rule, opt: 'delRule'})
}

operator$$.subscribe(() => rules$$.next())

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

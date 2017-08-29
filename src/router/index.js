import Vue from 'vue'
import Router from 'vue-router'
import RuleManagement from '@/view/pages/rule-management'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/management',
      name: 'RuleManagement',
      component: RuleManagement
    },
    {
      path: '*',
      redirect: {
        name: 'RuleManagement'
      }
    }
  ]
})

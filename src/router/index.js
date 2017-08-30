import Vue from 'vue'
import Router from 'vue-router'

import RuleManagement from '@/view/pages/management/rule-management'
import Logs from '@/view/pages/logs/logs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/management',
      name: 'RuleManagement',
      component: RuleManagement
    },
    {
      path: '/logs',
      name: 'Logs',
      component: Logs
    },
    {
      path: '*',
      redirect: {
        name: 'RuleManagement'
      }
    }
  ]
})

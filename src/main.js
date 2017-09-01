// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRx from 'vue-rx'
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs'
import daoStyle from 'dao-style-package-vue'
// 此处 import 的顺序不能错
import '@/assets/const'
import '@/assets/http'

import App from './App'
import router from './router'

// 导入所有的组件
import './view/components'
import { activate } from '@/model/hub'

Vue.config.productionTip = false

Vue.use(VueRx, {
  Observable,
  Subscription,
  Subject,
  BehaviorSubject
})
Vue.use(daoStyle)

activate()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

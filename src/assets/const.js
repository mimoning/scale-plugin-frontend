import Noty from 'noty'
import axios from 'axios'
import lodash from 'lodash'
import moment from 'moment'
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs'

import 'noty/lib/noty.css'
import 'animate.css'

const defaultUrl = 'http://192.168.100.30:30002'
let API_URL = defaultUrl
console.log(process.env)
if (process.env.API_URL) {
  API_URL = process.env.API_URL
  // API_URL 不能是 /, 否则最终 XHR 的请求 url 就变成了 http://api/networks 这样
  if (process.env.API_URL === '/') {
    API_URL = '.'
  }
}
console.log(API_URL)

Noty.overrideDefaults({
  layout: 'topCenter',
  theme: 'relax',
  type: 'success',
  progressBar: false,
  closeWith: ['click', 'button'],
  animation: {
    open: 'animated fadeInDown',
    close: 'animated fadeOutUp'
  },
  timeout: 5000
})

const $noty = {
  show (text, type) {
    return new Noty({ text, type }).show()
  },
  success (text) {
    this.show(text, 'success')
  },
  error (text) {
    this.show(text, 'error')
  }
}

Object.assign(window, {
  API_URL,
  _: lodash,
  Rx: { Observable, Subscription, Subject, BehaviorSubject },
  $http: axios,
  moment,
  $noty
})

import Noty from 'noty'
import axios from 'axios'
import lodash from 'lodash'
import moment from 'moment'
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs'

import 'noty/lib/noty.css'
import 'animate.css'

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
  _: lodash,
  Rx: { Observable, Subscription, Subject, BehaviorSubject },
  $http: axios,
  moment,
  $noty
})

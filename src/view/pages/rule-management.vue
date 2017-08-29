<template src="./rule-management.html"></template>

<script>
  import {
    rulesVm$$,
    addRule,
    delRule
  } from '@/model/rule/rule.stream'
  import { servicesVm$$ } from '@/model/service/service.stream'

  export default {
    name: 'RuleManagement',
    subscriptions: {
      rules: rulesVm$$,
      services: servicesVm$$
    },
    data () {
      return {
        rules: []
      }
    },
    methods: {
      addRule (rule) {
        addRule(rule)
      },
      delRule (name) {
        delRule(name)
      }
    }
  }
</script>

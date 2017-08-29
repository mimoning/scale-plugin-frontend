<template src="./rule-management.html"></template>

<script>
  import {
    rulesVm$$,
    // addRule,
    delRule
  } from '@/model/rule/rule.stream'
  import { servicesVm$$ } from '@/model/service/service.stream'

  import RuleDialogs from '@/view/components/dialogs/rule-dialogs'

  export default {
    name: 'RuleManagement',
    components: {
      RuleDialogs
    },
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
      // 处理操作，当有操作发生时，打开相应的 dialog
      handleOperation (opt, data) {
        this.$refs.dialog.$emit(opt, data)
      },
      // 确认删除
      handleRemove (rule) {
        delRule(rule.name)
          .subscribe(() => {
            $noty.success(`扩容规则${rule.name}删除成功`)
          })
          .catch(() => {
            $noty.error(`扩容规则${rule.name}删除失败`)
          })
      }
    }
  }
</script>

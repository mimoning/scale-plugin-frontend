<template src="./rule-management.html"></template>

<script>
  import loading from '@/assets/loading'
  import { hub$$ } from '@/model/hub'
  import {
    rulesVm$$,
    // addRule,
    delRule
  } from '@/model/rule/rule.stream'
  import { bindsVm$$ } from '@/model/bind/bind.stream'
  import serviceApi from '@/model/service/service'

  import RuleDialogs from '@/view/components/dialogs/rule-dialogs'

  export default {
    name: 'RuleManagement',
    components: {
      RuleDialogs
    },
    subscriptions: {
      loading: loading.loading$$,
      rules: rulesVm$$,
      binds: bindsVm$$
    },
    data () {
      return {
        unbindRule$$: new Rx.Subject()
      }
    },
    beforeCreate () {
      // 开始 loading
      loading.open()
    },
    created () {
      // 处理解绑操作的订阅
      this.unbindRule$$.delayWhen(serviceApi.unbindRule)
        .subscribe(serv => {
          hub$$.next('service')
          $noty.success(`服务 ${serv.name} 与扩容规则 ${serv.bindRule} 解绑成功`)
        })
    },
    updated () {
      // 当数据都获取到时，取消 loading
      if (this.rules && this.binds && this.loading) {
        loading.close()
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
            $noty.success(`扩容规则 ${rule.name} 删除成功`)
          }, () => {
            $noty.error(`扩容规则 ${rule.name} 删除失败`)
          })
      },
      // 确认解绑
      handleUnbind (serv) {
        this.unbindRule$$.next(serv)
      }
    }
  }
</script>

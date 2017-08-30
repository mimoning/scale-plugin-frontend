<template>
  <dao-setting-layout>
    <template slot="layout-title">扩容日志</template>
    <dao-setting-section>
      <log-list :rows="logs"></log-list>
    </dao-setting-section>
  </dao-setting-layout>
</template>
<script>
import { logsVm$$ } from '@/model/log/log.stream'

export default {
  name: 'Logs',
  subscriptions () {
    return {
      logs: logsVm$$
    }
  }
}
</script>


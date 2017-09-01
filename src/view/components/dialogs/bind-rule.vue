<template>
  <dao-dialog
    :visible.sync="isShow"
    :config="config">
    <dao-setting-section>
      <dao-setting-item>
        <template slot="label">服务名称</template>
        <template slot="content">
          <dao-select v-model="targetService" placeholder="选择服务名称" no-data-text="暂无可绑定的服务">
            <dao-option-group>
              <dao-option v-for="serv in services" :value="serv.name" :label="serv.name" :key="serv.name"></dao-option>
            </dao-option-group>
          </dao-select>
        </template>
      </dao-setting-item>
      <dao-setting-item>
        <template slot="label">规则名称</template>
        <template slot="content">
          <dao-select v-model="targetRule" placeholder="选择规则名称" no-data-text="暂无可绑定的规则" :disabled="!targetService">
            <dao-option-group>
              <dao-option v-for="rule in rules" :value="rule.name" :label="rule.name" :key="rule.name"></dao-option>
            </dao-option-group>
          </dao-select>
        </template>
      </dao-setting-item>
      <dao-setting-item>
        <template slot="label">负载均衡模式</template>
        <template slot="content">F5 负载均衡</template>
      </dao-setting-item>
    </dao-setting-section>
    <template slot="footer">
      <button class="dao-btn ghost" @click="onClose">取消</button>
      <button class="dao-btn blue" v-stream:click="{ subject: bindRule$$, data: { rule: targetRule, service: targetService } }">确认</button>
    </template>
  </dao-dialog>
</template>
<script>
import { servicesVm$$ } from '@/model/service/service.stream'
import { rulesVm$$ } from '@/model/rule/rule.stream'
import { hub$$ } from '@/model/hub'
import serviceApi from '@/model/service/service'
import Dialog from './dialog'

export default {
  name: 'BindRule',
  extends: Dialog,
  subscriptions () {
    this.bindRule$$ = new Rx.Subject()
    return {
      servicesList: servicesVm$$,
      rulesList: rulesVm$$
    }
  },
  data () {
    return {
      config: {
        title: '绑定规则'
      },
      targetRule: null,
      targetService: null
    }
  },
  computed: {
    rules () {
      if (this.rulesList) {
        return _.filter(this.rulesList, rule => rule.service === this.targetService)
      }
      return []
    },
    services () {
      if (this.servicesList) {
        return this.servicesList
      }
      return []
    }
  },
  created () {
    this.bindRule$$
      .concatMap(({ data }) => serviceApi.bindRule(data.service, data.rule))
      .subscribe(() => {
        hub$$.next('bind')
        this.success()
      }, () => {
        this.error()
      })
  },
  methods: {
    success () {
      this.onClose()
      $noty.success(`服务 ${this.targetService} 和规则 ${this.targetRule} 绑定成功`)
    },
    error () {
      $noty.success(`服务 ${this.targetService} 和规则 ${this.targetRule} 绑定失败`)
    }
  }
}
</script>


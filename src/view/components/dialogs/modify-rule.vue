<template>
  <dao-dialog
    :visible.sync="isShow"
    :config="config">
    <dao-setting-section>
      <dao-setting-item>
        <template slot="label">规则名</template>
        <template slot="content">{{ this.data.name }}</template>
      </dao-setting-item>
      <dao-setting-item>
        <template slot="label">服务名</template>
        <template slot="content">{{ this.data.service }}</template>
      </dao-setting-item>
      <dao-setting-item>
        <template slot="label">触发条件</template>
        <template slot="content">
          <input type="text" class="dao-control" v-model="settings.condition">
        </template>
      </dao-setting-item>
      <dao-setting-item>
        <template slot="label">步长</template>
        <template slot="content">
          <input type="number" class="dao-control" v-model="settings.step">
        </template>
      </dao-setting-item>
      <dao-setting-item>
        <template slot="label">扩容上限</template>
        <template slot="content">
          <input type="number" class="dao-control" v-model="settings.limit">
        </template>
      </dao-setting-item>
      <dao-setting-item>
        <template slot="label">扫描间隔（s）</template>
        <template slot="content">
          <input type="number" class="dao-control" v-model="settings.scan">
        </template>
      </dao-setting-item>
    </dao-setting-section>
    <template slot="footer">
      <button class="dao-btn ghost" @click="onClose">取消</button>
      <button class="dao-btn ghost" v-stream:click="{
        subject: modifyRule$$,
        data: {
          rule: data.name,
          settings,
        }
      }">确认</button>
    </template>
  </dao-dialog>
</template>
<script>
import { hub$$ } from '@/model/hub'
import ruleApi from '@/model/rule/rule'
import Dialog from './dialog'

export default {
  name: 'ModifyRule',
  extends: Dialog,
  props: ['data'],
  subscriptions () {
    this.modifyRule$$ = new Rx.Subject()
  },
  data () {
    return {
      config: {
        title: '修改扩容规则'
      },
      settings: {
        condition: '',
        step: undefined,
        limit: undefined,
        scan: undefined
      }
    }
  },
  created () {
    this.modifyRule$$.concatMap(({ data }) => ruleApi.modifyRule(data.rule, data.settings))
      .subscribe(() => {
        hub$$.next('all')
        $noty.success('扩容规则修改成功')
        this.onClose()
      }, () => {
        $noty.error('扩容规则修改失败')
      })
  },
  watch: {
    data (val) {
      const settings = _.cloneDeep(val)
      this.settings = {
        condition: settings.condition,
        step: settings.step,
        limit: settings.limit,
        scan: settings.scan
      }
    }
  }
}
</script>


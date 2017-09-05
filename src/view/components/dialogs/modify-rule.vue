<template>
  <dao-dialog
    class="complicate-dialog"
    :visible.sync="isShow"
    :config="{
      title: `修改扩容规则 ${this.data.name}`
    }">
    <dao-setting-section class="fixed-info">
      <dao-setting-item>
        <template slot="label">服务</template>
        <template slot="content">{{ data.service }}</template>
      </dao-setting-item>
    </dao-setting-section>

    <div class="side-bar-dialog border-top">
      <!-- side bar -->
      <div class="dialog-nav">
        <ul class="mt-none">
          <!-- <li :class="{active: tab === 'basicInfo'}" @click="tab = 'basicInfo'">基本信息</li> -->
          <li :class="{active: tab === 'trigger'}" @click="tab = 'trigger'">触发条件</li>
          <li :class="{active: tab === 'config'}" @click="tab = 'config'">配置</li>
        </ul>
      </div>
      <!-- content -->
      <div class="dialog-content p-none">

        <dao-setting-section class="bt-none" v-if="tab === 'trigger'">
          <dao-setting-item>
            <template slot="content">
              <div>
                如果以下条件 <dao-select class="condition-select" v-model="settings.condition.logic" size="sm">
                  <dao-option :value="1">全部</dao-option>
                  <dao-option :value="0">任意</dao-option>
                </dao-select> 满足，则触发扩容
              </div>
              <dao-editable-table v-model="triggerCondition"
                :config="conditionConfig">
              </dao-editable-table>
              <div class="error-text" v-show="conditionError">
                {{ conditionError }}
              </div>
            </template>
          </dao-setting-item>
        </dao-setting-section>

        <dao-setting-section class="bt-none" v-if="tab === 'config'">
          <dao-setting-item>
            <template slot="label">扫描间隔（s）</template>
            <template slot="content">
              <dao-select v-model="settings.scan">
                <dao-option :value="30" label="30 s"></dao-option>
                <dao-option :value="45" label="45 s"></dao-option>
                <dao-option :value="60" label="60 s"></dao-option>
              </dao-select>
            </template>
          </dao-setting-item>
          <dao-setting-item>
            <template slot="label">单次扩容数量</template>
            <template slot="content">
              <input type="number" v-model.number="settings.step" class="dao-control">
            </template>
          </dao-setting-item>
          <dao-setting-item>
            <template slot="label">扩容上限</template>
            <template slot="content">
              <input type="number" v-model.number="settings.limit" class="dao-control">
            </template>
          </dao-setting-item>
        </dao-setting-section>
      </div>
    </div>
    <template slot="footer">
      <button class="dao-btn ghost" @click="onClose">取消</button>
      <button class="dao-btn blue" v-stream:click="{
        subject: modifyRule$$,
        data: {
          rule: data.name,
          settings,
        }
      }"
      :disabled="!canModify()">确认</button>
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
      tab: 'trigger',
      settings: {
        condition: {
          logic: 1
        },
        step: undefined,
        limit: undefined,
        scan: undefined
      },
      conditionConfig: {
        header: [
          '资源',
          '条件',
          '阈值（%）'
        ],
        body: [{
          type: 'select',
          name: 'name',
          default: 'cpu',
          options: [
            {
              label: 'CPU',
              value: 'cpu'
            },
            {
              label: '内存',
              value: 'mem'
            }
          ]
        }, {
          type: 'text',
          name: 'condition',
          default: '大于'
        }, {
          type: 'input',
          name: 'value',
          validate (data) {
            const value = parseFloat(data.value)
            if (isNaN(value)) {
              return '阈值只能为数值'
            }
            if (value > 100) {
              return '阈值不应该超过 100%'
            }
            if (value <= 0) {
              return '阈值不应该小于或者等于 0'
            }
            return true
          }
        }]
      },
      conditionError: '',
      triggerCondition: []
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
      this.settings = _.cloneDeep(val)
      // this.settings = {
      //   condition: settings.condition,
      //   step: settings.step,
      //   limit: settings.limit,
      //   scan: settings.scan
      // }
      const _condition = []
      _.forEach(this.settings.condition, (v, k) => {
        if (k !== 'logic') {
          _condition.push({
            name: k,
            value: v,
            condition: '大于'
          })
        }
      })
      this.triggerCondition = _condition
    },
    triggerCondition (val) {
      this.conditionError = this.isErrorCondition(val)
      if (!this.conditionError) {
        const condition = {
          logic: this.settings.condition.logic
        }
        // 遍历获取的触发条件数据，格式化成需要的键值对格式 { logic, cpu, mem }
        _.forEach(val, item => {
          condition[item.name] = window.parseFloat(item.value)
        })
        // 赋值
        this.settings.condition = condition
      }
    }
  },
  methods: {
    isErrorCondition (conditions) {
      // 如果去重后长度有改变，则说明有重复，则报错
      if (_.uniqBy(conditions, 'name').length < conditions.length) {
        return '不要重复对资源进行条件设置'
      }
      return ''
    },
    canModify () {
      return !(_.isEqual(this.settings, this.data) &&
        (this.settings.condition.cpu ||
        this.settings.condition.mem) &&
        this.settings.limit &&
        this.settings.scan &&
        this.settings.step) &&
        !this.conditionError
    }
  }
}
</script>
<style lang="scss">
.fixed-info {
  padding: 20px;
}
.border-top {
  border-top: 1px solid #e4e7ed;
}
</style>


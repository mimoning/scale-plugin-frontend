<template>
  <dao-dialog
    class="complicate-dialog"
    :visible.sync="isShow"
    :config="config">
    <div class="side-bar-dialog">
      <!-- side bar -->
      <div class="dialog-nav">
        <ul>
          <li :class="{active: tab === 'basicInfo'}" @click="tab = 'basicInfo'">基本信息</li>
          <li :class="{active: tab === 'trigger'}" @click="tab = 'trigger'">触发条件</li>
          <li :class="{active: tab === 'config'}" @click="tab = 'config'">配置</li>
        </ul>
      </div>
      <!-- content -->
      <div class="dialog-content p-none">
        <dao-setting-section v-show="tab === 'basicInfo'">
          <dao-setting-item>
            <template slot="label">规则名称</template>
            <template slot="content">
              <input type="text" class="dao-control" v-model="dataConfig.name">
            </template>
          </dao-setting-item>
          <dao-setting-item>
            <template slot="label">服务</template>
            <template slot="content">
              <dao-select v-model="dataConfig.service" placeholder="选择服务" no-data-text="暂无可选服务">
                <dao-option-group>
                  <dao-option v-for="serv in services" :value="serv.name" :label="serv.name" :key="serv.name"></dao-option>
                </dao-option-group>
              </dao-select>
            </template>
          </dao-setting-item>
        </dao-setting-section>

        <dao-setting-section class="bt-none" v-show="tab === 'trigger'">
          <dao-setting-item>
            <template slot="content">
              <div>
                如果以下条件 <dao-select class="condition-select" v-model="condition" size="sm">
                  <dao-option :value="1">全部</dao-option>
                  <dao-option :value="0">任意</dao-option>
                </dao-select> 满足，则触发扩容
              </div>
              <dao-editable-table v-model="dataConfig.triggerCondition"
                :config="conditionConfig">
              </dao-editable-table>
              <div class="error-text" v-show="conditionError">
                {{ conditionError }}
              </div>
            </template>
          </dao-setting-item>
        </dao-setting-section>

        <dao-setting-section class="bt-none" v-show="tab === 'config'">
          <dao-setting-item>
            <template slot="label">单次扩容数量</template>
            <template slot="content">
              <input type="number" v-model="dataConfig.step" class="dao-control">
            </template>
          </dao-setting-item>
          <dao-setting-item>
            <template slot="label">扫描间隔（s）</template>
            <template slot="content">
              <input type="number" v-model="dataConfig.scan" class="dao-control">
            </template>
          </dao-setting-item>
          <dao-setting-item>
            <template slot="label">扩容上限</template>
            <template slot="content">
              <input type="number" v-model="dataConfig.limit" class="dao-control">
            </template>
          </dao-setting-item>
        </dao-setting-section>
      </div>
    </div>
    <template slot="footer">
      <button class="dao-btn ghost" @click="onClose">取消</button>
      <button class="dao-btn blue" :disabled="!formComplete" v-stream:click="{
        subject: create$$,
        data: dataConfig
      }">确定</button>
    </template>
  </dao-dialog>
</template>
<script>
import { hub$$ } from '@/model/hub'
import { servicesVm$$ } from '@/model/service/service.stream'
import ruleApi from '@/model/rule/rule'
import Dialog from './dialog'

// 初始化数据
function _dataConfig () {
  return {
    // 数据
    name: '',
    service: '',
    triggerCondition: [],
    // step
    step: undefined,
    scan: undefined,
    limit: undefined
  }
}

export default {
  name: 'CreateRule',
  extends: Dialog,
  subscriptions () {
    this.create$$ = new Rx.Subject()
    return {
      services: servicesVm$$
    }
  },
  data () {
    return {
      config: {
        title: '添加扩容规则'
      },
      // 侧边栏
      tab: 'basicInfo',
      // 触发条件
      condition: 1,
      conditionConfig: {
        header: [
          '资源',
          '条件',
          '阈值（%）'
        ],
        body: [{
          type: 'select',
          name: 'name',
          default: 'CPU',
          options: [
            {
              label: 'CPU',
              value: 'CPU'
            },
            {
              label: '内存',
              value: 'Memory'
            }
          ]
        }, {
          type: 'text',
          name: 'condition',
          default: '大于'
        }, {
          type: 'input',
          name: 'value'
        }]
      },
      dataConfig: _dataConfig()
    }
  },
  computed: {
    conditionError () {
      // 如果去重后长度有改变，则说明有重复，则报错
      if (_.uniqBy(this.dataConfig.triggerCondition, 'name').length < this.dataConfig.triggerCondition.length) {
        return '不要重复对资源进行条件设置'
      }
      return ''
    },
    // 表单完整度验证
    formComplete () {
      return this.dataConfig.name && this.dataConfig.service && !this.conditionError &&
        this.dataConfig.triggerCondition.length && this.dataConfig.step && this.dataConfig.scan &&
        this.dataConfig.limit
    }
  },
  created () {
    // 订阅创建规则数据流
    this.create$$
      .map(({ data }) => this.createParams(data))
      .concatMap(ruleApi.addRule)
      .subscribe(() => {
        hub$$.next('rule')
        $noty.success(`扩容规则 ${this.dataConfig.name} 创建成功`)
        this.onClose()
      }, () => {
        $noty.error(`扩容规则 ${this.dataConfig.name} 创建失败`)
      })
  },
  watch: {
    isShow (val) {
      if (!val) {
        this.tab = 'basicInfo'
        this.dataConfig = _dataConfig()
      }
    }
  },
  methods: {
    createParams (data) {
      const condition = _.reduce(data.triggerCondition, (sum, item) => {
        if (sum) {
          return `${sum} ${this.condition ? 'and' : 'or'} ${item.name}: ${item.value}%`
        }
        return `${sum}${item.name}: ${item.value}%`
      }, '')

      return {
        name: data.name,
        service: data.service,
        condition,
        scan: data.scan,
        step: data.step,
        limit: data.limit
      }
    }
  }
}
</script>
<style lang="scss">
.condition-select {
  width: 80px!important;
}
</style>



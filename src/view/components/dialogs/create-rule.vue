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
                如果以下条件 <dao-select class="condition-select" v-model="dataConfig.condition.logic" size="sm">
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

        <dao-setting-section class="bt-none" v-show="tab === 'config'">
          <!-- 扫描间隔 -->
          <dao-setting-item>
            <template slot="label">扫描间隔</template>
            <template slot="content">
              <dao-select v-model="dataConfig.scan">
                <dao-option :value="30" label="30 s"></dao-option>
                <dao-option :value="45" label="45 s"></dao-option>
                <dao-option :value="60" label="60 s"></dao-option>
              </dao-select>
            </template>
          </dao-setting-item>
          <!-- 单次扩容数量输入框 -->
          <dao-setting-item>
            <template slot="label">单次扩容数量</template>
            <template slot="content">
              <input type="number" v-model.number="dataConfig.step" class="dao-control">
            </template>
          </dao-setting-item>
          <!-- 扩容上限输入框 -->
          <dao-setting-item>
            <template slot="label">扩容上限</template>
            <template slot="content">
              <input type="number" v-model.number="dataConfig.limit" class="dao-control">
            </template>
          </dao-setting-item>
        </dao-setting-section>
      </div>
    </div>
    <!-- 对话框自定义底部内容 -->
    <template slot="footer">
      <!-- 取消按钮 -->
      <button class="dao-btn ghost" @click="onClose">取消</button>
      <!-- 确认按钮 -->
      <button class="dao-btn blue" :disabled="!formComplete" @click="handleCondirm(dataConfig)">确定</button>
    </template>
  </dao-dialog>
</template>
<script>
// 引入整个应用的数据接口
import { hub$$ } from '@/model/hub'
// 引入服务的数据
import { servicesVm$$ } from '@/model/service/service.stream'
// 引入规则的 api 供调用
import ruleApi from '@/model/rule/rule'
// 引入对话框类
import Dialog from './dialog'

// 初始化数据
function _dataConfig () {
  return {
    // 数据
    name: '',
    service: '',
    condition: {
      logic: 1
    },
    // step
    step: undefined,
    scan: 30,
    limit: undefined
  }
}

export default {
  name: 'CreateRule',
  extends: Dialog,
  // 订阅的数据
  subscriptions () {
    return {
      // 订阅了服务的列表
      services: servicesVm$$
    }
  },
  // 组件的一些自定义属性
  data () {
    return {
      // 对话框的自定义配置
      config: {
        title: '添加扩容规则'
      },
      // 侧边栏所处的位置
      tab: 'basicInfo',
      // 触发条件可编辑表格的自定义配置
      conditionConfig: {
        // 表格头部项
        header: [
          '资源',
          '条件',
          '阈值（%）'
        ],
        // 表格内容项
        body: [{
          // 表格内容类型
          type: 'select',
          // 表格内容对应的行对象中的属性
          name: 'name',
          // 表格内容默认值
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
          // 表格输入框的验证逻辑
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
      // 触发条件的错误信息
      conditionError: '',
      // 触发条件的输入数据
      triggerCondition: [],
      // 初始化的数据，用来保存格式化之后的规则数据
      dataConfig: _dataConfig()
    }
  },
  computed: {
    // 表单完整度验证, 当表单填写完整，且填写数据没有有错误的情况下，才能点击确认添加规则
    formComplete () {
      return this.dataConfig.name &&
        this.dataConfig.service &&
        (this.dataConfig.condition.cpu ||
        this.dataConfig.condition.mem) &&
        this.dataConfig.step &&
        this.dataConfig.scan &&
        this.dataConfig.limit
    }
  },
  watch: {
    // 此处监听对话框的显示状态
    // 如果对话框关闭，则把所有已填入的数据初始化，以防再次打开对话框时已有数据填充
    isShow (val) {
      if (!val) {
        this.tab = 'basicInfo'
        this.dataConfig = _dataConfig()
        this.triggerCondition = []
      }
    },
    // 监听触发条件数据变化，实时将数组转化成需要的键值对
    triggerCondition (val) {
      // 当数据出错时，产生错误信息
      this.conditionError = this.isErrorCondition(val)
      // 如果不出错时，将数据转化成正确格式的数据
      if (!this.conditionError) {
        // 这里需要将原有的 logic 数据复制过来
        const condition = {
          logic: this.dataConfig.condition.logic
        }
        // 遍历获取的触发条件数据，格式化成需要的键值对格式 { logic, cpu, mem }
        _.forEach(val, item => {
          condition[item.name] = window.parseFloat(item.value)
        })
        // 赋值
        this.dataConfig.condition = condition
      }
    }
  },
  methods: {
    // 判断触发条件的数据是否有错误
    isErrorCondition (val) {
      // 如果去重后长度有改变，则说明有重复，则报错
      if (_.uniqBy(val, 'name').length < val.length) {
        return '不要重复对资源进行条件设置'
      }
      return ''
    },
    // 确认添加规则
    handleCondirm (data) {
      // 请求
      ruleApi.addRule(data)
        // 请求成功时
        .then(() => {
          // 更新规则列表的数据
          hub$$.next('rule')
          // 提示添加成功
          $noty.success(`扩容规则 ${this.dataConfig.name} 创建成功`)
          // 关闭对话框
          this.onClose()
        }, () => {
          // 这里是添加失败的回调
          // 提示添加失败
          $noty.error(`扩容规则 ${this.dataConfig.name} 创建失败`)
        })
    }
  }
}
</script>
<style lang="scss">
// 特殊样式
.condition-select {
  width: 80px!important;
}
</style>



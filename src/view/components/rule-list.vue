<template>
  <div>
    <div class="dao-table-toolbar">
      <button class="dao-btn blue">添加规则</button>
      <button class="dao-btn ghost pull-right ml-sm"
        title="刷新"
        style="padding: 7px;"
        @click="refresh">
        <svg class="icon">
          <use xlink:href="#icon_update"></use>
        </svg>
      </button>
      <div class="table-filters">
        <dao-input placeholder="搜索扩容规则" :search="true" v-model="keyword"></dao-input>
      </div>
    </div>
    <table class="dao-table row">
      <thead>
        <tr>
          <th>规则名称</th>
          <th>触发条件</th>
          <th>步长</th>
          <th>扩容上限</th>
          <th>扫描间隔</th>
          <th>服务名称</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rule in chunks[page]" :key="rule.name">
          <!-- 规则名称 -->
          <td>{{ rule.name }}</td>
          <!-- 触发条件 -->
          <td>{{ rule.condition }}</td>
          <!-- 步长 -->
          <td>{{ rule.step }}</td>
          <!-- 扩容上限 -->
          <td>{{ rule.limit }}</td>
          <!-- 扫描间隔 -->
          <td>{{ rule.scan }} s</td>
          <!-- 服务名称 -->
          <td>{{ rule.service }}</td>
          <!-- 操作 -->
          <td>
            <svg class="icon operate-icon" v-dao-tooltip:top="'修改规则'" @click="operation('modifyRule', rule)">
              <use xlink:href="#icon_wrench"></use>
            </svg>
            <svg class="icon operate-icon" v-dao-tooltip:top="'删除规则'" @click="operation('remove', rule)">
              <use xlink:href="#icon_trash"></use>
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
    <empty-state title="列表为空" v-show="!chunks.length"></empty-state>
  </div>
</template>
<script>
import { hub$$ } from '@/model/hub'

import List from './list'

export default {
  name: 'RuleList',
  extends: List,
  data () {
    return {
      searchRange: [
        row => row.name,
        row => row.service
      ]
    }
  },
  methods: {
    refresh () {
      hub$$.next('rule')
    },
    // 触发操作
    operation (opt, data) {
      this.$emit('operation', opt, data)
    }
  }
}
</script>


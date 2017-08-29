<template>
  <div>
    <div class="dao-table-toolbar">
      <button class="dao-btn blue">绑定规则</button>
    </div>
    <table class="dao-table row">
      <thead>
        <tr>
          <th>服务名称</th>
          <th>规则名称</th>
          <th>LB 模式</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in chunks[page]" :key="service.name">
          <!-- 服务名称 -->
          <td>{{ service.name }}</td>
          <!-- 规则名称 -->
          <td>{{ service.bindRule }}</td>
          <!-- LB 模式 -->
          <td>{{ service.lbMode }}</td>
          <!-- 操作 -->
          <td>
            <svg class="icon">
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
  name: 'ServiceList',
  extends: List,
  data () {
    return {
      searchRange: [
        row => row.name
      ]
    }
  },
  methods: {
    refresh () {
      hub$$.next('service')
    }
  }
}
</script>


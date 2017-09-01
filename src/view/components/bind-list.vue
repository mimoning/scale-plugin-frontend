<template>
  <div>
    <div class="dao-table-toolbar">
      <button class="dao-btn blue" @click="bindRule">绑定规则</button>
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
        <tr v-for="bind in chunks[page]" :key="bind.name">
          <!-- 服务名称 -->
          <td>{{ bind.service }}</td>
          <!-- 规则名称 -->
          <td>{{ bind.rule }}</td>
          <!-- LB 模式 -->
          <td>{{ bind.lbMode }}</td>
          <!-- 操作 -->
          <td>
            <svg class="icon operate-icon" v-dao-tooltip:top="'解除绑定'" @click="unbindRule(bind)">
              <use xlink:href="#icon_unplugged"></use>
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
    <empty-state title="列表为空" v-show="!chunks.length"></empty-state>
  </div>
</template>
<script>
import List from './list'

export default {
  name: 'bindList',
  extends: List,
  methods: {
    // 解绑规则
    unbindRule (serv) {
      this.$emit('operation', 'unbind', serv)
    },
    // 绑定规则
    bindRule () {
      this.$emit('operation', 'bindRule')
    }
  }
}
</script>


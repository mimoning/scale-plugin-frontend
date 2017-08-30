<template>
  <div>
    <div class="dao-table-toolbar overflow-hidden">
      <button class="dao-btn ghost pull-right ml-sm"
        title="刷新"
        style="padding: 7px;"
        @click="refresh">
        <svg class="icon">
          <use xlink:href="#icon_update"></use>
        </svg>
      </button>
      <div class="table-filters">
        <dao-input placeholder="搜索日志" :search="true" v-model="keyword"></dao-input>
      </div>
    </div>
    <table class="dao-table row">
      <thead>
        <tr>
          <th>服务</th>
          <th>规则名称</th>
          <th>扩容执行时间</th>
          <th>触发条件状态</th>
          <th>扩容前容器数</th>
          <th>扩容目标容器数</th>
          <th>执行状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in chunks[page]">
          <!-- 服务 -->
          <td>{{ log.service }}</td>
          <!-- 规则名称 -->
          <td>{{ log.rule }}</td>
          <!-- 扩容执行时间 -->
          <td>{{ log.createdAt }}</td>
          <!-- 触发条件状态 -->
          <td>{{ log.conditionStatus }}</td>
          <!-- 扩容前容器数 -->
          <td>{{ log.beforeCounts }}</td>
          <!-- 扩容目标容器数 -->
          <td>{{ log.targetCounts }}</td>
          <!-- 执行状态 -->
          <td>
            <span class="success-text" v-show="log.status === 'success'">成功</span>
            <span class="error-text" v-show="log.status === 'fail'">失败</span>
          </td>
        </tr>
      </tbody>
    </table>
    <empty-state title="暂无日志" v-show="chunks.length === 0"></empty-state>
    <div class="dao-table-page">
      <div class="dao-btn-group">
        <button class="dao-btn dao-icon ghost" @click="prev" :disabled="page === 0">
          <svg class="icon">
            <use xlink:href="#icon_caret-left"></use>
          </svg>
        </button>
        <button class="dao-btn dao-icon ghost" @click="next" :disabled="chunks.length === 0 || page === chunks.length - 1">
          <svg class="icon">
            <use xlink:href="#icon_caret-right"></use>
          </svg>
        </button>
      </div>
      <span class="dao-table-page-span">
      {{ chunks.length > 0 ? page * limit + 1 : 0 }}
        -
      {{ chunks.length === 0 || page === chunks.length - 1 ? currentRows.length : page * limit + limit }}
      ，共 {{ currentRows.length }} 条{{tableName}}
      </span>
    </div>
  </div>
</template>
<script>
import { hub$$ } from '@/model/hub'
import List from '@/view/components/list'

export default {
  name: 'LogList',
  extends: List,
  data () {
    return {
      searchRange: [
        row => row.service,
        row => row.rule,
        row => row.status
      ],
      tableName: '日志'
    }
  },
  methods: {
    refresh () {
      hub$$.next('log')
    }
  }
}
</script>

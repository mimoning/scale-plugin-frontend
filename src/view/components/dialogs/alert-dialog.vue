<template>
  <dao-dialog class="alert-dialog" :config="config" :visible.sync="isShow" @dao-dialog-close="onClose" @dao-dialog-cancel="onClose">
    <div class="alert-dialog-content">
      {{content}}
    </div>
    <div slot="footer">
      <button class="dao-btn ghost" @click="onClose">取消</button>
      <button class="dao-btn" :class="type === 'normal' ? 'blue' : 'red'" @click="onConfirm">{{ primaryText }}</button>
    </div>
  </dao-dialog>
</template>

<script>
import Dialog from './dialog'

export default {
  name: 'AlertDialog',
  extends: Dialog,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'normal' // 删除弹框为 'danger'
    },
    header: {
      type: String
    },
    content: {
      type: String
    },
    primaryText: {
      type: String,
      default: '保存并变更'
    }
  },
  data () {
    return {
      config: {
        type: 'normal',
        title: this.header,
        showHeader: true,
        showFooter: true
      }
    }
  },
  watch: {
    header (newV) {
      if (!newV) return
      this.config.title = newV
    }
  },
  methods: {
    onConfirm () {
      this.$emit('confirm')
      this.onClose()
    }
  }
}
</script>

<style scoped lang="scss">
.alert-dialog {
  z-index: 10000000;
}

.alert-dialog-content {
  padding: 20px;
}
</style>

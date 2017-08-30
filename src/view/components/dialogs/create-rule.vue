<template>
  <dao-dialog
    :visible.sync="isShow"
    :config="config">
    This is the create rule dialog
  </dao-dialog>
</template>
<script>
import Dialog from './dialog'

export default {
  name: 'CreateRule',
  extends: Dialog,
  data () {
    return {
      config: {
        title: '添加扩容规则'
      }
    }
  }
}
</script>


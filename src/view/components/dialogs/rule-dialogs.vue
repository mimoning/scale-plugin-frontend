<template>
  <!-- remove rule -->
  <alert-dialog
    :visible.sync="remove.visible"
    :header="remove.config.header"
    :content="remove.config.content"
    :primaryText="remove.config.primaryText"
    type="remove"
    @confirm="handleRemove"
  ></alert-dialog>
</template>
<script>
import MultiDialog from './multi-dialog'

export default {
  name: 'RuleDialogs',
  extends: MultiDialog,
  data () {
    return {
      remove: {
        visible: false,
        config: {
          header: '删除扩容规则',
          content: '你确认要删除这个扩容规则吗？',
          primaryText: '删除'
        }
      }
    }
  },
  created () {
    this.bindEvents('remove')
  },
  methods: {
    handleRemove () {
      this.$emit('confirmRemove', this.remove.data)
    }
  }
}
</script>


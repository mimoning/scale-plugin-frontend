<template>
  <div>
    <!-- remove rule -->
    <alert-dialog
      :visible.sync="remove.visible"
      :header="remove.config.header"
      :content="remove.config.content"
      :primaryText="remove.config.primaryText"
      type="remove"
      @confirm="handleRemove"
    ></alert-dialog>
    <!-- unbind dialog -->
    <alert-dialog
      :visible.sync="unbind.visible"
      :header="unbind.config.header"
      :content="unbind.config.content()"
      :primaryText="unbind.config.primaryText"
      @confirm="handleUnbind"
    ></alert-dialog>
    <!-- bind rule -->
    <bind-rule
      :visible.sync="bindRule.visible">
    </bind-rule>
    <!-- modify rule -->
    <modify-rule
      :visible.sync="modifyRule.visible"
      :data="modifyRule.data">
    </modify-rule>
    <!-- create rule -->
    <create-rule
      :visible.sync="createRule.visible">
    </create-rule>
  </div>
</template>
<script>
import MultiDialog from './multi-dialog'
import BindRule from './bind-rule'
import ModifyRule from './modify-rule'
import CreateRule from './create-rule'

export default {
  name: 'RuleDialogs',
  extends: MultiDialog,
  components: {
    CreateRule,
    BindRule,
    ModifyRule
  },
  data () {
    return {
      remove: {
        visible: false,
        config: {
          header: '删除扩容规则',
          content: '确认要删除这个扩容规则吗？',
          primaryText: '删除'
        }
      },
      unbind: {
        visible: false,
        config: {
          header: '解除绑定',
          content: () => `确定要将服务 ${this.unbind.data.service} 和扩容规则 ${this.unbind.data.name} 解绑吗？`,
          primaryText: '确定'
        },
        data: {}
      },
      bindRule: {
        visible: false
      },
      modifyRule: {
        visible: false,
        data: {}
      },
      createRule: {
        visible: false
      }
    }
  },
  created () {
    this.bindEvents('remove', 'unbind', 'bindRule', 'modifyRule', 'createRule')
  },
  methods: {
    handleRemove () {
      this.$emit('confirmRemove', this.remove.data)
    },
    handleUnbind () {
      this.$emit('confirmUnbind', this.unbind.data)
    }
  }
}
</script>


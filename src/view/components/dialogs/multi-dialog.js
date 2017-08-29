// 当你在一个组件中包含了多个 dialog 时，你 maybe 就会需要用到这个 dialog 扩展了
// 当你在打开 dialog 时需要传入数据时，将会按照数据传入的顺序构成数组放入该 dialog 的 data 字段中
export default {
  name: 'MultiDialog',
  methods: {
    bindEvents (...keys) {
      _.forEach(keys, key => {
        this.$on(key, data => {
          this.openDialog(key, data)
        })
      })
    },
    openDialog (key, data) {
      this[key].visible = true
      this[key].data = data
    },
    closeDialog (key) {
      this[key].visible = false
    }
  }
}

export default {
  name: 'List',
  props: ['rows'],
  data () {
    return {
      lodash: _,
      tableName: '',
      keyword: '',
      searchRange: [],
      limit: 10,
      page: 0
    }
  },
  computed: {
    currentRows () {
      return this.search(this.rows)
    },
    chunks () {
      return _.chunk(this.currentRows, this.limit) || []
    }
  },
  methods: {
    search (rows) {
      // TODO: 这里不一定是 name 的，不是所有数据都有 name
      if (this.searchRange.length === 0) {
        return _.filter(rows, row => {
          if (row.name) {
            return row.name.includes(this.keyword)
          }
          return true
        })
      }
      return _.filter(rows, row => {
        let match = false
        _.forEach(this.searchRange, func => {
          if (func(row).toString().indexOf(this.keyword) > -1) {
            match = true
            return false
          }
          return true
        })
        return match
      })
    },
    next () {
      this.page = this.page + 1
    },
    prev () {
      this.page = this.page - 1
    }
  },
  watch: {
    keyword () {
      this.page = 0
    }
  }
}

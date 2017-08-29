class Rule {
  constructor (data) {
    this.init(data)
  }
  init (data) {
    this.name = data.name
    this.condition = data.condition
    this.step = data.step
    this.limit = data.limit
    this.scan = data.scan
    this.service = data.service
  }
}

export {
  Rule
}

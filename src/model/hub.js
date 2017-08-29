const Jobs = [
  'rule',
  'service'
]

const hub$$ = new Rx.Subject()
  .map(job => {
    if (Array.isArray(job)) {
      return job
    }
    if (job === 'all') {
      return Jobs
    }
    return [job]
  })

function activate () {
  hub$$.next('all')
}

export {
  activate,
  hub$$
}

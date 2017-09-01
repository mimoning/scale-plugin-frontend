const loading$$ = new Rx.BehaviorSubject()

function open () {
  loading$$.next(true)
}

function close () {
  loading$$.next(false)
}

export default {
  open,
  close,
  loading$$
}

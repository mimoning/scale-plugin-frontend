function getBinds () {
  return $http.get('/api/binds')
    .then(res => res.data)
}

export default {
  getBinds
}

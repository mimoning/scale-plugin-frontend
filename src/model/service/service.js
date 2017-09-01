function getServices () {
  return $http.get('/api/services')
    .then(res => res.data)
}

export default {
  getServices
}

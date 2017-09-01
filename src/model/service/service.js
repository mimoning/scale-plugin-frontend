function getServices () {
  return $http.get('/services')
    .then(res => res.data)
}

export default {
  getServices
}

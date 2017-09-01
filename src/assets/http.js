// interceptors
$http.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)
// defaults
let DCE_TOKEN = localStorage.getItem('DCE_TOKEN')
if (!DCE_TOKEN) {
  DCE_TOKEN = 'eyJhbGciOiJIUzI1NiIsImV4cCI6MTUwNDg2NDE3OSwiaWF0IjoxNTAyMjcyMTc5fQ.eyJ1c2VybmFtZSI6ImFkbWluIn0.EBq0xjj9Hz6vg4lzVPPFkciACHB8UMwhcZV9ATYNWaI'
}
try {
  DCE_TOKEN = JSON.parse(DCE_TOKEN)
} catch (e) {}

Object.assign($http.defaults, {
  baseURL: API_URL,
  headers: {
    'X-DCE-Access-Token': DCE_TOKEN
  }
})

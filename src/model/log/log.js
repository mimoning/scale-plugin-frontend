import LOGS from './logs.json'

function getLogs () {
  console.log(LOGS)
  return Promise.resolve(LOGS)
}

export default {
  getLogs
}

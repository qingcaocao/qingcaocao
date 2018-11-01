import axios from 'axios'
import url from 'js/api.js'

function fetch(url,data) {
  return new Promise(
    (resolve,rejects) => {
      axios.post(url,data).then( res => {
        // let status = res.data.status
        // if(status === 200) {
        //   resolve(res)
        // }
        // if(status === 300) {
        //   location.href = 'login.html'
        //   resolve(res)
        // }
        // rejects(res)
         resolve(res)
      }).catch(error => {
        rejects(error)
      })
    }
  )
}
export default fetch

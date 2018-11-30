import Axios from 'axios'
import router from '@/router'

const RpdManagerAPI = 'http://localhost:3001'

export default {

  uploadxlsfile (context, file, redirect) {
    Axios.post(`${RpdManagerAPI}/api/v1/xlsximport`, file)
        .then(({data}) => {
          if (redirect) router.push(redirect)
          context.snackbar = true
          context.message = 'File upload complete'
        }).catch(({response: {data}}) => {
          context.snackbar = true
          context.message = data.message
        })
  }
}

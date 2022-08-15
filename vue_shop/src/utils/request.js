import axios from 'axios'
axios.defaults.baseURL = "http://timemeetyou.com:8889/api/private/v1/"

axios.interceptors.request.use(config=>{
   config.headers.Authorization = sessionStorage.getItem("token")
   return config
})

export default  axios
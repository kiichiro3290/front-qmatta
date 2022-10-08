import axios from 'axios'
axios.defaults.baseURL = 'https://qmatta.vercel.app/'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

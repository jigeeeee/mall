import axios from "axios";

//第四种网络请求方式（使用Promise（实例instance里已经有Promise，所以不需要再new一个Promise））
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //拦截器-请求拦截
  instance.interceptors.request.use(config => {
    console.log(config.data);
    return config
  }, err => {
    console.log(err);
  })
  //响应拦截
  instance.interceptors.response.use(res => {
    console.log(res.data);
    return res.data
  }, err => {
    console.log(err);
  })


  return instance(config)
}

//第一种网络请求的方式
// export function request(config, success, failure) {
//   const instance = axios.create({
//     baseURL: '',
//     timeout: 5000
//   })
//
//   instance(config)
//     .then(res => {
//       success(res)
//     })
//     .catch(err =>{
//       failure(err)
//     })
// }

//第二种网络请求的方式
// export function request(config) {
//   const instance = axios.create({
//     baseURL: '',
//     timeout: 5000
//   })
//
//   instance(config.baseConfig)
//     .then(res => {
//       config.success(res)
//     })
//     .catch(err =>{
//       config.failure(err)
//     })
// }

//第三种网络请求的方式(使用Promise)
// export function request(config) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: '',
//       timeout: 5000
//     })
//
//     instance(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

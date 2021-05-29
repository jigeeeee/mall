import {request} from "@/network/request";
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
//第三种网络请求方式（Promise）||第四种方法的Promise也是这样写
// request({
//   url: '/recommend'
// }).then(res => {
//   console.log(res);
// })
//   .catch(err => {
//     console.log(err);
//   })


//第一种网络请求方式
// request({
//   url: ''
// },
//   res => {
//     console.log(res);
//   },
//   err => {
//     console.log(err);
//   })

//第二种网络请求方式
// request({
//   baseConfig: {},
//   success: function (res) {
//     console.log(res);
//   },
//   failure: function (err) {
//     console.log(err);
//   }
// })

let url = {
  hotlists: '/index/hotLists',
  banner: '/index/banner',
  topList:'/category/topList',
  subList:'/category/subList',
  rank:'/category/rank',
  searchList:'/search/list',
  details: '/goods/details',
  addCart: '/cart/add',
  cartLists: '/cart/list',
  cartReduce: '/cart/reduce',
  cartRemove: '/cart/remove',
  cartMremove: '/cart/mremove'
}

//开发环境和真实环境切换
let host= 'http://rap2api.taobao.org/app/mock/7058'

// let host = 'http://rapapi.org/mockjsdata/24170'

for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url [key]
  }
}
export default url

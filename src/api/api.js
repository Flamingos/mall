import request from '@/utils/request'

const IndexUrl= 'homepage'; //首页数据接口
export function getHome() {
  return request({
    url: IndexUrl,
    method: 'get'
  })
}

const Category= 'category'; //
export function getCategory() {
  return request({
    url: Category,
    method: 'get'
  })
}

const CategorySub= 'categorysub'; //
export function getCategorySub(query) {
  return request({
    url: CategorySub,
    method: 'get',
    params: query
  })
}

const Goods= 'goods'; //
export function getGoods() {
  return request({
    url: Goods,
    method: 'get'
  })
}

const Search= 'search'; //
export function searchGoods(query) {
  return request({
    url: Search,
    method: 'get',
    params: query
  })
}

const Address= 'address'; //
export function getAddress() {
  return request({
    url: Address,
    method: 'get'
  })
}
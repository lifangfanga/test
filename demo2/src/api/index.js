import { httpPost } from '@/axios/index.js'

export const getList = data => {
  return httpPost('url', data)
}

export const foo = (a, b) => {
  return a + b
}

// 将图片的加载写成一个promise,一旦加载完成,Promise的状态就发生变化
export const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image()
    image.onload = resolve
    image.onerror = reject
    image.src = path
  })
}
export const loadImg = (src) => {
  return new Promise(
    (resolve, reject) => {
      const img = document.createElement('img')
      img.onload = () => {
        resolve(img)
      }
      img.onerror = () => {
        const err = new Error(`图片加载失败 ${src}`)
        reject(err)
      }
      img.src = src
    }
  )
}
// // 将多个渲染数据分别给各个then
// getInfo().then((res) => {
//   const { bannerList } = res
//   // 渲染轮播图
//   console.log(bannerList)
//   return res
// }).then((res) => {
//   const { storeList } = res
//   // 渲染店铺列表
//   console.log(storeList)
//   return res
// }).then((res) => {
//   const { categoryList } = res
//   console.log(categoryList)
//   // 渲染分类列表
//   return res
// })

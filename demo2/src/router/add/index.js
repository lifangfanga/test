import {
  createRoute
} from '../data'

const add = [
  {
    filePath: 'login',
    // title: '计量点方案',
    from: ['/user-station']
  },
  {
    filePath: 'plan',
    from: ['/login']
  }
]

export const areaRouters = [
  ...add
].map(v => {
  return createRoute(v)
})

import {resetRouter} from '@/router/index'
import NProgress from 'nprogress'

function TreeComponent (data) {
  let arr = data || [];
  arr.forEach((item) => {
    if (item.name === 'frame') {
      item.component = require('@/pages/frame/frame.vue').default
    } else {
      if (item.name) {
        item.component = getViews(item.meta.filePath)
      }
    }
    if (item.children) {
      TreeComponent(item.children)
    }
  })

  return arr;
}
function getViews (path) {
  return resolve => {
    require.ensure([], (require) => {
      resolve(require('@/pages/views/' + path + '.vue'))
    })
  }
}
export let routerList = []
export default (router, store) => {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    if (!store.state.status) {
      if (to.path === '/login') {
        next(true)
      } else {
        store.dispatch('setStatus', true);
        setRouter(router, store)
        next({ ...to, replace: true })
      }
    } else {
      if (routerList.length === 0 && to.path !== '/login' && to.path !== '/') {
        setRouter(router, store)
        next({ ...to, replace: true })
      } else {
        next(true)
      }
    }
    // next(true)
  })
  router.afterEach((to, from) => {
    window.document.title = '花开管理系统' + (to.meta.title ? '-' + to.meta.title : '');
    NProgress.done()
    if (to.matched.length === 0 && to.path !== '/') {
      router.replace({name: 'err404'})
      setTimeout(() => router.go(0))
    }
    // ...
  })
}

function setRouter (router, store) {
  if (!store.state.login && !store.state.login.navList) return;
  routerList = []
  const navList = JSON.parse(JSON.stringify(store.state.login.navList))
  let routers = TreeComponent(navList)
  routers.push({
    path: '*', name: 'err404', component: require('@/pages/views/error-page/404.vue').default
  })
  routerList = routers
  resetRouter()
  router.addRoutes(routers);
}

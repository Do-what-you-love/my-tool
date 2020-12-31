import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
/*
* 路由配置文件
* */
/* 登录模块 */

const login = resolve => require.ensure([], () => resolve(require('../pages/login/login')), 'login')
const alipay = resolve => require.ensure([], () => resolve(require('../pages/alipay/alipay')), 'alipay')

/* 404 */
// const fourofour = resolve => require.ensure([], () => resolve(require('../pages/views/error-page/404')), '404')
export const constantRoutes = [
  {
    path: '/',
    component: App,
    /* 顶层路由 */
    children: [
    /* 地址为空时跳转login页面 */
      { path: '', redirect: '/login' },
      { path: '/login', name: 'login', meta: { title: '登录' }, component: login }
    ]
  },
  {
    path: '/alipay',
    name: 'alipay',
    component: alipay
  }
]
export const asyncRoutes = [
  {
    path: '/frame',
    // component: frame,
    name: 'frame',
    children: [
      {
        path: 'home',
        // component: home,
        name: 'home',
        meta: {
          icon: 'shouye',
          showClose: 0,
          componentPath: '/frame/home',
          role: ['admin'],
          filePath: 'index/home',
          breadcrumb: false,
          title: '首页'
        }
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          icon: 'userconfig',
          showClose: 1,
          componentPath: '/frame/user',
          role: ['admin'],
          filePath: 'user/user',
          title: '用户管理'
        }
      },
      {
        path: 'seachutils',
        name: 'seachutils',
        meta: {
          icon: 'seachutils',
          showClose: 1,
          componentPath: '/frame/seachutils',
          role: ['admin'],
          redirect: 'noRedirect',
          filePath: 'seachutils/index',
          title: '查询助手'
        },
        children: [
          {
            path: 'school',
            name: 'school',
            meta: {
              con: 'shouye',
              showClose: 1,
              componentPath: '/frame/seachutils/school',
              role: ['admin'],
              filePath: 'seachutils/school/list',
              title: '查学校'
            }
          },
          {
            path: 'remarks',
            name: 'remarks',
            meta: {
              con: 'shouye',
              showClose: 1,
              componentPath: '/frame/seachutils/remarks',
              role: ['admin'],
              filePath: 'seachutils/remarks/remarks',
              title: '查专业'
            }
          },
          {
            path: 'occupation',
            name: 'occupation',
            meta: {
              con: 'shouye',
              showClose: 1,
              componentPath: '/frame/seachutils/occupation',
              role: ['admin'],
              filePath: 'seachutils/occupation/occupation',
              title: '查职业'
            }
          },
          {
            path: 'batchline',
            name: 'batchline',
            meta: {
              // icon: 'batch',
              showClose: 1,
              componentPath: '/frame/seachutils/batchline',
              role: ['admin'],
              filePath: 'seachutils/batchline/batchline',
              title: '批次线'
            }
          },
          {
            path: 'gradeSection',
            name: 'gradeSection',
            meta: {
              // icon: 'Piecewise',
              showClose: 1,
              componentPath: '/frame/seachutils/gradeSection',
              role: ['admin'],
              filePath: 'seachutils/gradeSection/gradeSection',
              title: '一分一段'
            }
          },
          {
            path: 'samePoint',
            name: 'samePoint',
            meta: {
              // icon: 'points',
              showClose: 1,
              componentPath: '/frame/seachutils/samePoint',
              role: ['admin'],
              filePath: 'seachutils/samePoint/samePoint',
              title: '同分去向'
            }
          },
          {
            path: 'enrollmentplan',
            name: 'enrollmentplan',
            meta: {
              // icon: 'admissions',
              showClose: 1,
              componentPath: '/frame/seachutils/enrollmentplan',
              role: ['admin'],
              filePath: 'seachutils/enrollmentplan/enrollmentplan',
              title: '招生计划'
            }
          }
        ]
      },
      {
        path: 'gaugetype',
        name: 'gaugetype',
        meta: {
          icon: 'gaugetype',
          showClose: 1,
          componentPath: '/frame/gaugetype',
          role: ['admin'],
          filePath: 'gaugetype/gaugetype',
          title: '测评中心'
        }
      },
      {
        path: 'pointfill',
        name: 'pointfill',
        meta: {
          icon: 'filltool',
          showClose: 1,
          componentPath: '/frame/pointfill',
          role: ['admin'],
          filePath: 'pointfill/pointfill',
          title: '填报中心'
        }
      },
      {
        path: 'basissetting',
        name: 'basissetting',
        meta: {
          icon: 'base',
          showClose: 1,
          componentPath: '/frame/basissetting',
          role: ['admin'],
          filePath: 'basissetting/basissetting',
          title: '个人/机构中心',
          needDelete: true
        },
        children: [
          {
            path: 'account',
            name: 'account',
            meta: {
              // icon: 'admissions',
              showClose: 1,
              componentPath: '/frame/basissetting/account',
              role: ['admin'],
              filePath: 'basissetting/submuit/account',
              title: '账号管理'
            }
          }
        ]
      },
      {
        path: 'pay',
        name: 'pay',
        hidden: true,
        meta: {
          showClose: 1,
          componentPath: '/frame/pay',
          role: ['admin'],
          filePath: 'index/pay',
          title: '充值'
        }
      },
      {
        path: 'expert',
        name: 'expert',
        hidden: true,
        meta: {
          showClose: 1,
          redirect: '/frame/expert/expertList',
          componentPath: '/frame/expertList',
          role: ['admin'],
          filePath: 'index/expertIndex',
          title: '专家页'
        },
        children: [
          {
            path: 'expertList',
            name: 'expertList',
            hidden: true,
            meta: {
              showClose: 1,
              componentPath: '/frame/expertexpertList',
              role: ['admin'],
              filePath: 'index/expertList',
              title: '专家列表'
            }
          },
          {
            path: 'expertDetails',
            name: 'expertDetails',
            hidden: true,
            meta: {
              showClose: 1,
              componentPath: '/frame/expertList/expertDetails',
              role: ['admin'],
              filePath: 'index/expertDetails',
              title: '专家详情'
            }
          }
        ]
      },
      {
        path: 'organizationSet',
        name: 'organizationSet',
        hidden: true,
        meta: {
          showClose: 1,
          componentPath: '/frame/organizationSet',
          role: ['admin'],
          filePath: 'index/organizationSet',
          title: '机构设置'
        }
      }
    ]
  }

]
// let falseAuth = () => {
//   let user = '';
//   user = constantRoutes[0].children.concat(asyncRoutes)
//   return user;
// }
const createRouter = () => new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  // routes: falseAuth()
  routes: constantRoutes
})
const router = createRouter()
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 通过新建一个全新的 Router，然后将新的 Router.matcher 赋给当前页面的管理 Router，以达到重置路由。
}
export default router

import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/customer-management'
    // name: 'Dashboard',
    // hidden: true,
    // children: [{
    //   path: 'dashboard',
    //   component: () => import('@/views/dashboard/index')
    // }]
  },

  {
    path: '/customer-management',
    component: Layout,
    redirect: '/customer-management/newCustomer',
    name: '客户管理',
    meta: { title: '客户管理', icon: 'cm' },
    children: [
      {
        path: 'newCustomer',
        name: '新客户',
        component: () => import('@/views/CustomerManagement/table'),
        meta: { title: '新客户', icon: 'tree' }
      },
      {
        path: 'highIntention',
        name: '高意向',
        component: () => import('@/views/CustomerManagement/table'),
        meta: { title: '高意向', icon: 'tree' }
      },
      {
        path: 'followUp',
        name: '可跟进',
        component: () => import('@/views/CustomerManagement/table'),
        meta: { title: '可跟进', icon: 'tree' }
      },
      {
        path: 'tradingCustomers',
        name: '成交客户',
        component: () => import('@/views/CustomerManagement/table'),
        meta: { title: '成交客户', icon: 'tree' }
      },
      {
        path: 'expiringClient',
        name: '即将到期客户',
        component: () => import('@/views/CustomerManagement/table'),
        meta: { title: '即将到期客户', icon: 'tree' }
      },
      {
        path: 'overdueFee',
        name: '到期未续费',
        component: () => import('@/views/CustomerManagement/table'),
        meta: { title: '到期未续费', icon: 'tree' }
      },
      {
        path: 'unableToConnect',
        name: '无法接通',
        component: () => import('@/views/CustomerManagement/table'),
        meta: { title: '无法接通', icon: 'tree' }
      },
      {
        path: 'invalidClues',
        name: '无效线索',
        component: () => import('@/views/CustomerManagement/table'),
        meta: { title: '无效线索', icon: 'tree' }
      }
    ]
  },

  {
    path: '/resource-allocation',
    component: Layout,
    redirect: '/resource-allocation/to-be-allocated',
    name: '资源分配',
    meta: { title: '资源分配', icon: 'example' },
    children: [
      {
        path: 'to-be-allocated',
        name: '待分配资源',
        component: () => import('@/views/ResourceAllocation/ToBeAllocated'),
        meta: { title: '待分配资源', icon: 'table' }
      },
      {
        path: 'data-mining',
        name: '数据挖掘',
        component: () => import('@/views/ResourceAllocation/DataMining'),
        meta: { title: '数据挖掘', icon: 'tree' }
      },
      {
        path: 'get-mining-conditions/:id',
        name: '查看挖掘条件',
        component: () => import('@/views/ResourceAllocation/GetMiningConditions'),
        meta: { title: '查看挖掘条件', icon: 'tree' },
        hidden: true,//不需要渲染在菜单栏
      },
      {
        path: 'get-results/:id',
        name: '查看挖掘结果',
        component: () => import('@/views/ResourceAllocation/GetResults'),
        meta: { title: '查看挖掘结果', icon: 'tree' },
        hidden: true,//不需要渲染在菜单栏
      },
      {
        path: 'remining/:id',
        name: '重新挖掘',
        component: () => import('@/views/ResourceAllocation/Remining'),
        meta: { title: '重新挖掘', icon: 'tree' },
        hidden: true,//不需要渲染在菜单栏
      },
      {
        path: 'startmining',
        name: '开始挖掘',
        component: () => import('@/views/ResourceAllocation/StartMining'),
        meta: { title: '开始挖掘', icon: 'tree' },
        hidden: true,//不需要渲染在菜单栏
      }
    ]
  },
  

  {
    path: '/customer-relationship',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '客户公海',
        component: () => import('@/views/CustomerRelationship/table'),
        meta: { title: '客户公海', icon: 'form' }
      }
    ]
  },

  {
    path: '/system-settings',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '系统设置',
        component: () => import('@/views/SystemSettings/index'),
        meta: { title: '系统设置', icon: 'setting' }
      }
    ]
  },
  {
    path: '/data-report',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '数据报表',
        component: () => import('@/views/DataReport/index'),
        meta: { title: '数据报表', icon: 'datareport' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


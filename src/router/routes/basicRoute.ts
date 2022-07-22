import {
  EXCEPTION_COMPONENT,
  LAYOUT,
  PAGE_NOT_FOUND_NAME
} from '/@/router/routes/constant'

const ROOT = {
  path: '/',
  name: 'Root',
  component: LAYOUT,
  meta: {
    title: '首页'
  }
}

const PAGE_NOT_FOUND_ROUTE = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: '找不到页面',
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: '找不到页面',
        hideMenu: true
      }
    }
  ]
}

export default [ROOT, PAGE_NOT_FOUND_ROUTE]

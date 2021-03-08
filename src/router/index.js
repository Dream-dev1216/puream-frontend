import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import bootstrap from './bootstrap'

// Routes
import PagesRoutes from './pages.routes'

Vue.use(Router)

export const routes = [
  ...PagesRoutes,
  {
    path: '/blank',
    name: 'blank',
    component: () => import(/* webpackChunkName: "blank" */ '@/pages/BlankPage.vue')
  },
  {
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: "error" */ '@/pages/error/NotFoundPage.vue'),
    meta: {
      layout: 'error'
    }
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes
})

let firstRoute = true

/**
 * Before each route update
 */
router.beforeEach(async (to, from, next) => {
  if (firstRoute) {
    firstRoute = false

    await bootstrap()
  }

  const roleId = store.state.auth.user.role ? store.state.auth.user.role.id : null

  const requiresAuth =
    (to.matched.some((record) => record.meta.admin)) ||
    (to.matched.some((record) => record.meta.applicant))

  if (requiresAuth) {
    if (roleId) {
      if (roleId !== 1 && to.matched.some((record) => record.meta.admin)) {
        return next({
          name: 'auth-signin'
        })
      } else if (roleId !== 2 && to.matched.some((record) => record.meta.applicant)) {
        return next({
          name: 'auth-signin'
        })
      }

      return next()
    } else {
      return next({
        name: 'auth-signin'
      })
    }
  }

  return next()
})
export default router

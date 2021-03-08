export default [{
  path: '/auth/signin',
  name: 'auth-signin',
  component: () => import(/* webpackChunkName: "auth-signin" */ '@/pages/auth/SigninPage.vue'),
  meta: {
    layout: 'auth',
    userNotAuth: true
  }
}, {
  path: '/auth/verify-email',
  name: 'auth-verify-email',
  component: () => import(/* webpackChunkName: "auth-verify-email" */ '@/pages/auth/VerifyEmailPage.vue'),
  meta: {
    layout: 'auth'
  }
}, {
  path: '/auth/forgot-password',
  name: 'auth-forgot',
  component: () => import(/* webpackChunkName: "auth-forgot" */ '@/pages/auth/ForgotPage.vue'),
  meta: {
    layout: 'auth',
    userNotAuth: true
  }
}, {
  path: '/auth/reset-password',
  name: 'auth-reset',
  component: () => import(/* webpackChunkName: "auth-reset" */ '@/pages/auth/ResetPage.vue'),
  meta: {
    layout: 'auth'
  }
}, {
  path: '/error/not-found',
  name: 'error-not-found',
  component: () => import(/* webpackChunkName: "error-not-found" */ '@/pages/error/NotFoundPage.vue'),
  meta: {
    layout: 'error'
  }
}, {
  path: '/error/unexpected',
  name: 'error-unexpected',
  component: () => import(/* webpackChunkName: "error-unexpected" */ '@/pages/error/UnexpectedPage.vue'),
  meta: {
    layout: 'error'
  }
}, {
  path: '/companies',
  name: 'companies-list',
  component: () => import(/* webpackChunkName: "companies-list" */ '@/pages/companies/Index.vue'),
  meta: {
    layout: 'admin',
    admin: true
  }
}, {
  path: '/companies/add',
  name: 'companies-add',
  component: () => import(/* webpackChunkName: "companies-add" */ '@/pages/companies/Add.vue'),
  meta: {
    layout: 'admin',
    admin: true
  }
}, {
  path: '/',
  name: 'start-query',
  component: () => import(/* webpackChunkName: "start-query" */ '@/pages/due-diligence-query/StartPage.vue'),
  meta: {
    applicant: true
  }
}, {
  path: '/due-diligence-query/:id',
  name: 'due-diligence-query',
  component: () => import(/* webpackChunkName: "due-diligence-query" */ '@/pages/due-diligence-query/MainPage.vue'),
  meta: {
    applicant: true
  }
}]

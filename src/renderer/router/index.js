import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: require('@/views/main/mainPage.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

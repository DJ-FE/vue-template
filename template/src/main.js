import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  {
    path: '/',
    name: 'index',
    component: App
  },
  {
    path: '*',
    redirect: { name: 'index' }
  }]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

new Vue({
  el: '#app',
  data () {
    return {
    }
  },
  created () {},
  router,
  render: h => h('router-view')
})

import Vue from 'vue'
import VueResource from 'vue-resource'

import Router from './routes'
import App from './App.vue'
import { store } from './store/store'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
    console.log(request);
    next();
});

console.log('store: ', store)

Router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.loadUser) {
    // authentication is required
    console.log('must load user')
    store.dispatch('user/loadUser').then(() => {
      store.dispatch('mqtt/startClient')
      next()
    }, (err) => {
      console.log('redirecting to signin...')
      next({ name: 'SignIn'})
    })
  } else {
    // authentication not required
    next()
  }
})

Router.afterEach((to, from) => {
  store.dispatch('resetMenuClass')
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: Router,
  store
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueFire from 'vuefire'
import IssueView from './components/IssueView.vue'
import Home from './components/Home.vue'
import 'vuetify/dist/vuetify.min.css'
import 'firebaseui/dist/firebaseui.css'

Vue.use(VueFire)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'


// Importing Bootstrap vue
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false


let app = null

// waith for firebase before starting the app
firebase.auth().onAuthStateChanged(() => {

  // init app if not exists
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: {App},
      template: '<App/>'
    })
  }

})
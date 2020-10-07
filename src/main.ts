import Vue from 'vue';
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './vee-validate';
import '@/static/styles/variables.css';
import '@/static/styles/fonts.css';
import '@/static/styles/global.css';
import '@/static/styles/reset.css';

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

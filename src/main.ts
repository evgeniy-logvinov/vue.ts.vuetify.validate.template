import Vue from 'vue';
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate';
import { Slide } from 'vue-burger-menu';
import '@/static/styles/variables.css';
import '@/static/styles/fonts.css';
import '@/static/styles/global.css';
import '@/static/styles/reset.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import TButton from '@/components/controls/TButton.vue';
import TInput from '@/components/controls/TInput.vue';
import CircleAvatar from '@/components/controls/CircleAvatar.vue';
import Multiselect from 'vue-multiselect';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './vee-validate';

Vue.component('multiselect', Multiselect);

Vue.component('TButton', TButton);
Vue.component('TInput', TInput);
Vue.component('CircleAvatar', CircleAvatar);
Vue.component('Slide', Slide);

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

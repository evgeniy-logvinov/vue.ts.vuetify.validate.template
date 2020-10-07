import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// Translation provided by Vuetify (typescript)
import ru from 'vuetify/src/locale/ru';
import en from 'vuetify/src/locale/en';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ru, en },
    current: process.env.VUE_APP_I18N_LOCALE || 'ru',
  },
});

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// Translation provided by Vuetify (typescript)
import ru from 'vuetify/src/locale/ru';
import en from 'vuetify/src/locale/en';

// import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  // theme: {
  //   themes: {
  //     light: {
  //       primary: colors.red.darken1, // #E53935
  //       secondary: colors.red.lighten4, // #FFCDD2
  //       accent: colors.indigo.base, // #3F51B5
  //     },
  //   },
  // },
  lang: {
    locales: { ru, en },
    current: process.env.VUE_APP_I18N_LOCALE || 'ru',
  },
});

import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: colors.green.lighten1, // #E53935
            secondary: colors.red.darken2, // #FFCDD2
            accent: colors.grey, // #3F51B5
          },
        },
        options: {
            customProperties: true
        }
      }
});

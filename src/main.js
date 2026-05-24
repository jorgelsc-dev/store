import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './styles/base.css'
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'brisaTheme',
    themes: {
      brisaTheme: {
        dark: false,
        colors: {
          primary: '#0F766E',
          secondary: '#D6C7B5',
          accent: '#E9A94E',
          surface: '#FFFDF8',
          background: '#F5F0E7',
          info: '#334155',
        },
      },
    },
  },
})

createApp(App).use(vuetify).mount('#app')

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
          primary: '#1F7A53',
          secondary: '#BEE8CB',
          accent: '#23B26F',
          surface: '#EEF8F2',
          background: '#E5F2E9',
          info: '#4B8E73',
        },
      },
    },
  },
})

createApp(App).use(vuetify).mount('#app')

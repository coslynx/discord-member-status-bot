import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import  as components from 'vuetify/components';
import  as directives from 'vuetify/directives';
import { createVuetify } from 'vuetify';

import './styles/index.css';
import './styles/tailwind.css';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
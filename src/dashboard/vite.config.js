import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from '@vitejs/plugin-vuetify';
import { resolve } from 'path';

// https://vuetifyjs.com/en/introduction/installation#vite
import  as components from 'vuetify/components';
import  as directives from 'vuetify/directives';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      components,
      directives,
      autoImport: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: '../dist',
  },
});
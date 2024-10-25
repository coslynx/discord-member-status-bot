import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Members from '../components/Members.vue';
import VoiceTime from '../components/VoiceTime.vue';
import MessageCount from '../components/MessageCount.vue';
import Config from '../components/Config.vue';
import About from '../components/About.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/members',
      name: 'members',
      component: Members,
    },
    {
      path: '/voice-time',
      name: 'voice-time',
      component: VoiceTime,
    },
    {
      path: '/message-count',
      name: 'message-count',
      component: MessageCount,
    },
    {
      path: '/config',
      name: 'config',
      component: Config,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});

export default router;
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import { formatDate } from '../utils/helper';

export const useMemberStore = defineStore('member', {
  state: () => ({
    members: ref([] as any[]),
    isLoading: ref(false),
  }),
  getters: {
    formattedMembers: (state) => computed(() => {
      return state.members.map((member: any) => ({
        ...member,
        joinedAt: formatDate(member.joinedAt),
      }));
    }),
  },
  actions: {
    async fetchAllMembers() {
      this.isLoading = true;
      try {
        const response = await axios.get('/api/members');
        this.members = response.data;
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
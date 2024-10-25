import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Member as MemberModel, MemberInterface } from '../models/member';
import axios from 'axios';
import { formatDate } from '../utils/helper';

export const useMemberStore = defineStore('member', {
  state: () => ({
    members: ref([] as Member[]),
    isLoading: ref(false),
  }),
  getters: {
    formattedMembers: (state) => computed(() => {
      return state.members.map((member) => ({
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
        this.members = response.data.map((memberData: MemberInterface) => new MemberModel(memberData));
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
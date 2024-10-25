import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Message as MessageModel, MessageInterface } from '../models/message';
import axios from 'axios';

export const useMessageCountStore = defineStore('messageCount', {
  state: () => ({
    messageCounts: ref([] as Message[]),
    isLoading: ref(false),
  }),
  getters: {
    formattedMessageCounts: (state) => computed(() => {
      return state.messageCounts.map((messageCount) => ({
        ...messageCount,
        messageCount: messageCount.messageCount.toString(),
      }));
    }),
  },
  actions: {
    async fetchDailyMessageCounts() {
      this.isLoading = true;
      try {
        const response = await axios.get('/api/messages');
        this.messageCounts = response.data.map((messageData: MessageInterface) => new MessageModel(messageData));
      } catch (error) {
        console.error('Error fetching daily message counts:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
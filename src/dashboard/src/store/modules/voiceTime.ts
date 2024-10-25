import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { VoiceChannel as VoiceChannelModel, VoiceChannelInterface } from '../models/voiceChannel';
import axios from 'axios';

export const useVoiceTimeStore = defineStore('voiceTime', {
  state: () => ({
    voiceTimeData: ref([] as VoiceChannel[]),
    isLoading: ref(false),
  }),
  getters: {
    formattedVoiceTimeData: (state) => computed(() => {
      return state.voiceTimeData.map((voiceData) => ({
        ...voiceData,
        totalVoiceTime: voiceData.totalVoiceTime.toString(),
      }));
    }),
  },
  actions: {
    async fetchVoiceChannelData() {
      this.isLoading = true;
      try {
        const response = await axios.get('/api/voice-channels');
        this.voiceTimeData = response.data.map((voiceData: VoiceChannelInterface) => new VoiceChannelModel(voiceData));
      } catch (error) {
        console.error('Error fetching voice channel data:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
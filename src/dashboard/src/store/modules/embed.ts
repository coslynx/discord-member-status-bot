import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Embed as EmbedModel, EmbedInterface } from '../models/embed';
import { useConfigStore } from './config';
import { EmbedBuilder } from 'discord.js';

export const useEmbedStore = defineStore('embed', {
  state: () => ({
    embedData: ref({} as EmbedInterface),
  }),
  getters: {
    formattedEmbed: (state) => computed(() => {
      const configStore = useConfigStore();
      const embedModel = new EmbedModel(state.embedData, configStore);
      return embedModel.createEmbed();
    }),
  },
  actions: {
    setEmbedData(data: EmbedInterface) {
      this.embedData = data;
    },
  },
});
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Config as ConfigModel, ConfigInterface } from '../models/config';
import { useEmbedStore } from './embed';
import { DBClient } from 'mysql2';
import axios from 'axios';

export const useConfigStore = defineStore('config', {
  state: () => ({
    configData: ref({} as ConfigInterface),
  }),
  getters: {
    embedLayout: (state) => computed(() => state.configData.embedLayout),
    updateFrequency: (state) => computed(() => state.configData.updateFrequency),
    embedColor: (state) => computed(() => state.configData.embedColor),
  },
  actions: {
    async fetchConfig(dbClient: DBClient) {
      try {
        const [rows] = await dbClient.execute('SELECT  FROM config');
        this.configData = rows[0] as ConfigInterface;
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    },
    async updateEmbedLayout(layout: string, dbClient: DBClient) {
      try {
        await dbClient.execute(
          'UPDATE config SET embedLayout = ? WHERE id = 1',
          [layout],
        );
        this.configData.embedLayout = layout;
        return true;
      } catch (error) {
        console.error('Error updating embed layout:', error);
        return false;
      }
    },
    async updateUpdateFrequency(interval: number, dbClient: DBClient) {
      try {
        await dbClient.execute(
          'UPDATE config SET updateFrequency = ? WHERE id = 1',
          [interval],
        );
        this.configData.updateFrequency = interval;
        return true;
      } catch (error) {
        console.error('Error updating update frequency:', error);
        return false;
      }
    },
  },
});
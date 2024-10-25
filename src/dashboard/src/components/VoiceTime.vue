<template>
  <div class="bg-white shadow-md rounded-lg p-8">
    <h2 class="text-2xl font-bold mb-4">Voice Channel Time</h2>
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <div class="spinner"></div>
    </div>
    <div v-else-if="voiceTimeData.length === 0">
      <p class="text-gray-600">No voice channel time data available.</p>
    </div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total Voice Time (Minutes)
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="voiceData in voiceTimeData" :key="voiceData.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="text-sm font-medium text-gray-900">
                  {{ voiceData.username }}#{{ voiceData.discriminator }}
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ voiceData.totalVoiceTime }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useVoiceTimeStore } from '../store/modules/voiceTime';

const voiceTimeStore = useVoiceTimeStore();

const voiceTimeData = ref(voiceTimeStore.voiceTimeData);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await voiceTimeStore.fetchVoiceChannelData();
  voiceTimeData.value = voiceTimeStore.voiceTimeData;
  isLoading.value = false;
});
</script>

<style scoped>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #0072ff;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
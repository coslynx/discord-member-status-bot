<template>
  <div class="bg-white shadow-md rounded-lg p-8">
    <h2 class="text-2xl font-bold mb-4">Bot Configuration</h2>

    <div class="mb-4">
      <label for="embedLayout" class="block text-gray-700 font-bold mb-2">Embed Layout</label>
      <select v-model="selectedEmbedLayout" id="embedLayout" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="default">Default</option>
        <option value="compact">Compact</option>
        <option value="detailed">Detailed</option>
      </select>
      <p class="text-gray-600 mt-2 text-sm">Select the desired embed layout for bot responses.</p>
    </div>

    <div class="mb-4">
      <label for="updateFrequency" class="block text-gray-700 font-bold mb-2">Update Frequency (Minutes)</label>
      <input
        type="number"
        v-model.number="updateFrequency"
        id="updateFrequency"
        min="1"
        max="60"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <p class="text-gray-600 mt-2 text-sm">Set the interval (in minutes) for automatic embed updates.</p>
    </div>

    <button @click="updateConfig" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Save Changes
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useConfigStore } from '../store/modules/config';
import { useMemberStore } from '../store/modules/member';

const configStore = useConfigStore();
const memberStore = useMemberStore();

const selectedEmbedLayout = ref(configStore.embedLayout);
const updateFrequency = ref(configStore.updateFrequency);

const updateConfig = async () => {
  try {
    await configStore.updateEmbedLayout(selectedEmbedLayout.value);
    await configStore.updateUpdateFrequency(updateFrequency.value);
    // Update member data after config changes
    await memberStore.fetchAllMembers();
    // Optional: display a success message
    console.log('Config updated successfully!');
  } catch (error) {
    console.error('Error updating config:', error);
    // Optional: display an error message
  }
};
</script>
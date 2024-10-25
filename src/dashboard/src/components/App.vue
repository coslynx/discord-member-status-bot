<template>
  <div id="app">
    <v-app>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useConfigStore } from "./store/modules/config";
import { useMemberStore } from "./store/modules/member";

const configStore = useConfigStore();
const memberStore = useMemberStore();

onMounted(async () => {
  // Fetch initial member data
  await memberStore.fetchAllMembers();

  // Start automatic updates based on configuration
  const updateInterval = configStore.updateFrequency  60000; // Convert minutes to milliseconds
  setInterval(async () => {
    await memberStore.fetchAllMembers();
  }, updateInterval);
});
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
  background: #f0f0f0;
}
</style>
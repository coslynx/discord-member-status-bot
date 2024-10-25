<template>
  <div class="bg-white shadow-md rounded-lg p-8">
    <h2 class="text-2xl font-bold mb-4">Welcome</h2>
    <p class="text-gray-600 mb-4">
      This dashboard provides real-time insights into member activity within your Discord server.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link to="/members" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Members
      </router-link>
      <router-link to="/voice-time" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Voice Time
      </router-link>
      <router-link to="/message-count" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Message Count
      </router-link>
      <router-link to="/config" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Configure
      </router-link>
      <router-link to="/about" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        About
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
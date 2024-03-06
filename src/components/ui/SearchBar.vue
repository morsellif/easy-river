<script setup lang="ts">
const store = useEasyRiverStore();
const { search, searchQuery, filterBookmarks } = storeToRefs(store);
</script>

<template>
  <div
    v-if="search"
    class="space-y-1 border-b p-3 text-lg font-medium transition-all will-change-auto"
  >
    <div v-if="!filterBookmarks">Cerca in tutte le stazioni</div>
    <div v-else>Cerca tra le stazioni preferite</div>
    <input
      v-model="searchQuery"
      class="w-full rounded-full"
      placeholder="Cerca stazione per nome..."
      type="text"
    />
  </div>
</template>

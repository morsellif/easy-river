<script setup lang="ts">
const store = useEasyRiverStore();
const { filterBookmarks } = storeToRefs(store);
</script>

<template>
  <button
    class="rounded-full border border-slate-200 bg-transparent px-3 py-1 hover:border-slate-300 hover:bg-slate-100"
    @click="store.toggleBookmarkFilter()"
  >
    <span class="flex space-x-2">
      <div>
        <IconsFilter v-if="!filterBookmarks" />
        <IconsFilterDismiss v-else />
      </div>
      <div>Bookmarks</div>
    </span>
  </button>
</template>

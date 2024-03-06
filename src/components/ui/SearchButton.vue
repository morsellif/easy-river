<script setup lang="ts">
const store = useEasyRiverStore();
const { search } = storeToRefs(store);
</script>

<template>
  <div class="flex items-center">
    <button
      class="inline-flex w-full justify-center rounded-full border border-slate-200 p-1 px-2 py-2 text-sm font-medium text-black transition delay-150 ease-in-out hover:border-slate-300 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 active:border-slate-400 active:bg-slate-200"
      :class="[search ? 'border-slate-300 bg-slate-100' : 'bg-transparent']"
      @click="store.toggleSearch()"
    >
      <IconsSearch />
    </button>
  </div>
</template>

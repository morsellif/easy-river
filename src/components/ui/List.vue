<script setup lang="ts">
defineProps<{
  time?: string;
}>();

const hidden: Ref<boolean> = ref(true);
const el: Ref<HTMLElement | null> = ref(null);

const { y } = useScroll(el, {
  behavior: 'smooth',
  onScroll: (_e) => {
    if (y.value > 50) {
      hidden.value = false;
    } else {
      hidden.value = true;
    }
  },
});
</script>

<template>
  <div
    class="flex flex-1 flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white drop-shadow-sm"
  >
    <div
      class="flex flex-col border-b border-gray-200 p-3 first:rounded-t-lg last:rounded-b-lg last:border-0"
    >
      <div class="flex flex-col space-y-2">
        <div class="flex align-middle">
          <div class="flex grow text-3xl font-bold">Livelli</div>
          <UiSearchButton />
        </div>

        <div class="flex w-full flex-wrap space-x-2">
          <UiBookmarkFilterButton />
          <UiLastUpdated :time="time" />
        </div>
      </div>
    </div>
    <div
      ref="el"
      class="relative overflow-y-auto overflow-x-hidden"
    >
      <UiBackToTop
        :class="[hidden ? 'hidden opacity-0' : 'opacity-100']"
        @click="y = 0"
      />
      <UiSearchBar />
      <slot />
    </div>
  </div>
</template>

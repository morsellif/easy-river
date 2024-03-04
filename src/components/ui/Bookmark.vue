<script setup lang="ts">
defineProps<{
  idstazione: string;
}>();

const easyRiverStore = useEasyRiverStore();
const { isBookmarked } = storeToRefs(easyRiverStore);
</script>

<template>
  <div class="group cursor-pointer flex-row p-3">
    <div
      class="group/add"
      @click="easyRiverStore.addBookmark(idstazione)"
    >
      <IconsBookmarkAdd
        v-if="!isBookmarked(idstazione)"
        class="block fill-blue-600 group-hover/add:hidden"
      />
      <IconsBookmarkAddFilled
        v-if="!isBookmarked(idstazione)"
        class="hidden fill-blue-600 group-hover/add:block"
      />
    </div>
    <div
      class="group/remove"
      @click="easyRiverStore.removeBookmark(idstazione)"
    >
      <IconsBookmarkFilled
        v-if="isBookmarked(idstazione)"
        class="block fill-blue-600 group-hover/remove:hidden"
      />
      <IconsBookmarkOffFilled
        class="hidden fill-blue-600 group-hover/remove:block"
        @click="isBookmarked(idstazione)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const bookmarked = ref(false);

const bookmark = () => {
  bookmarked.value = true;
};

const removeBookmark = () => {
  bookmarked.value = false;
};
</script>

<template>
  <div class="group cursor-pointer flex-row p-3">
    <div class="group/add">
      <IconsBookmarkAdd
        v-if="!bookmarked"
        class="block fill-blue-600 group-hover/add:hidden"
        @click="bookmark"
      />
      <IconsBookmarkAddFilled
        v-if="!bookmarked"
        class="hidden fill-blue-600 group-hover/add:block"
        @click="bookmark"
      />
    </div>
    <div class="group/remove">
      <IconsBookmarkFilled
        v-if="bookmarked"
        class="block fill-blue-600 group-hover/remove:hidden"
      />
      <IconsBookmarkOffFilled
        class="hidden fill-blue-600 group-hover/remove:block"
        @click="removeBookmark"
      />
    </div>
  </div>
</template>

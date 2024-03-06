<script setup lang="ts">
defineProps<{ time?: string }>();
</script>

<template>
  <div
    class="inline-flex space-x-3 rounded-full border border-green-300 bg-green-100 px-2 py-1"
  >
    <div
      v-if="time"
      class="font-medium text-green-600"
    >
      {{ new Date(parseInt(time)).toLocaleString('it-IT') }}
    </div>
  </div>
</template>

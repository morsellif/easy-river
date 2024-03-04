<script setup lang="ts">
const props = defineProps<{
  percentage: number;
  threshold1: number;
  threshold2: number;
  threshold3: number;
}>();

const hasCursor = () => {
  return props.percentage >= 0;
};

const cursorOffset = (percentage: number) => {
  return percentage >= 100 ? '- 24px' : '';
};
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div class="relative h-6 w-full overflow-hidden rounded-full">
      <div class="flex h-full w-full font-bold text-white">
        <div
          :class="[
            threshold2 === 0 && threshold3 === 0 ? 'w-full' : 'w-1/3',
            'bg-threshold1',
          ]"
        />
        <div
          v-if="threshold2 !== 0"
          :class="[threshold3 === 0 ? 'w-2/3' : 'w-1/3', 'bg-threshold2']"
        />
        <div
          v-if="threshold3 !== 0"
          class="w-1/3 bg-threshold3"
        />
      </div>
      <div
        v-if="hasCursor()"
        class="absolute top-1/2 mx-1 -translate-y-1/2 transform"
        :style="`left: calc(${percentage}% ${cursorOffset(percentage)})`"
      >
        <div
          class="h-4 w-4 rounded-full border-2 border-white bg-white/80 shadow-xl"
        />
      </div>
    </div>
    <div class="h-6 w-full overflow-hidden rounded-full">
      <div class="flex h-full w-full font-bold text-white">
        <div
          :class="[
            threshold2 === 0 && threshold3 === 0 ? 'w-full' : 'w-1/3',
            'text-threshold1',
          ]"
        >
          {{ threshold1 }} m
        </div>
        <div
          v-if="threshold2 !== 0"
          :class="[threshold3 === 0 ? 'w-2/3' : 'w-1/3', 'text-threshold2']"
        >
          {{ threshold2 }} m
        </div>
        <div
          v-if="threshold3 !== 0"
          class="w-1/3 text-threshold3"
        >
          {{ threshold3 }} m
        </div>
      </div>
    </div>
  </div>
</template>

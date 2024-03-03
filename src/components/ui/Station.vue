<script setup lang="ts">
interface Station {
  idstazione: string;
  ordinamento: number;
  nomestaz: string;
  lon: string;
  lat: string;
  value: number;
  soglia1: number;
  soglia2: number;
  soglia3: number;
}

defineProps<{ station: Station }>();

const hasLevels = (station: Station) => {
  return (
    station.soglia1 !== 0 || station.soglia2 !== 0 || station.soglia3 !== 0
  );
};

const hasCursor = (station: Station) => {
  return station.value >= station.soglia1;
};

const _relativePercentage = (
  value: number,
  belowLimit: number,
  upperLimit: number,
) => {
  return ((value - belowLimit) / (upperLimit - belowLimit)) * 100;
};

const _absolutePercentage = (
  relativePercentage: number,
  belowLimitPercentage: number,
  upperLimitPercentage: number,
) => {
  return (
    belowLimitPercentage +
    (upperLimitPercentage - belowLimitPercentage) * (relativePercentage / 100)
  );
};

const cursorPercentage = (station: Station) => {
  const limitSoglia = 33.333333;
  let relativePercentage;

  if (station.value < station.soglia2) {
    // the cursor must be on soglia1
    relativePercentage = _relativePercentage(
      station.value,
      station.soglia1,
      station.soglia2,
    );
    return _absolutePercentage(relativePercentage, 0, limitSoglia);
  } else if (station.value < station.soglia3) {
    // the cursor must me on soglia2
    relativePercentage = _relativePercentage(
      station.value,
      station.soglia2,
      station.soglia3,
    );
    // (limitSoglia * 2 * relativePercentage) / 100
    return _absolutePercentage(
      relativePercentage,
      limitSoglia,
      limitSoglia * 2,
    );
  } else {
    const upperLimit = (station.soglia3 * 100) / (limitSoglia * 2);
    relativePercentage = _relativePercentage(
      station.value,
      station.soglia3,
      upperLimit,
    );
    const absolutePercentage = _absolutePercentage(
      relativePercentage,
      limitSoglia * 2,
      100,
    );
    return absolutePercentage > 100 ? 100 : absolutePercentage;
  }
};
</script>

<template>
  <div class="flex flex-col pb-4 pt-4">
    <div class="flex flex-row">
      <div class="flex-1 flex-row">
        <div class="text-sm">NOME</div>
        <div class="text-xl font-bold">{{ station.nomestaz }}</div>
      </div>
      <div class="text-3xl font-bold">{{ station.value }} m</div>
    </div>
    <div
      v-if="hasLevels(station)"
      class="flex flex-1 flex-col"
    >
      <!-- bg-gradient-to-r from-yellow-400 to-red-600-->
      <div class="relative h-6 w-full overflow-hidden rounded-full">
        <div class="flex h-full w-full font-bold text-white">
          <div class="w-1/3 bg-yellow-400"></div>
          <div class="w-1/3 bg-orange-500"></div>
          <div class="w-1/3 bg-red-600"></div>
        </div>
        <div
          v-if="hasCursor(station)"
          class="absolute top-1/2 mx-1 -translate-y-1/2 transform"
          :style="`left: calc(${cursorPercentage(station)}% ${cursorPercentage(station) >= 100 ? '- 24px' : '- 4px'})`"
        >
          <div
            class="h-4 w-4 rounded-full border-2 border-white bg-white/80 shadow-xl"
          ></div>
          <!-- Adatta dimensioni e stile del cursore -->
        </div>
      </div>
      <div class="h-6 w-full overflow-hidden rounded-full">
        <div class="flex h-full w-full font-bold text-white">
          <div class="w-1/3 text-yellow-400">{{ station.soglia1 }} m</div>
          <div class="w-1/3 text-orange-500">{{ station.soglia2 }} m</div>
          <div class="w-1/3 text-red-600">{{ station.soglia3 }} m</div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex"
    >
      &nbsp;
    </div>
  </div>
</template>

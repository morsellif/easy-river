<script setup lang="ts">
defineProps<{ station: Station }>();

const hasThresholds = (station: Station) => {
  return (
    station.soglia1 !== 0 || station.soglia2 !== 0 || station.soglia3 !== 0
  );
};

const threshold1 = (station: Station) => {
  return (
    hasThresholds(station) &&
    station.value! >= station.soglia1 &&
    station.value! < station.soglia2
  );
};

const threshold2 = (station: Station) => {
  return (
    hasThresholds(station) &&
    station.value! >= station.soglia2 &&
    station.value! < station.soglia3
  );
};

const threshold3 = (station: Station) => {
  return (
    hasThresholds(station) &&
    station.soglia3 !== 0 &&
    station.value! >= station.soglia3
  );
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
  const absolutePercentage =
    belowLimitPercentage +
    (upperLimitPercentage - belowLimitPercentage) * (relativePercentage / 100);
  return absolutePercentage <= 100 ? absolutePercentage : 100;
};

const cursorPercentage = (station: Station) => {
  const limitSoglia = 33.333333;
  let lowerLimit = 0.0;
  let upperLimit = 0.0;
  let absoluteLowerLimit = 0.0;
  let absoluteUpperLimit = 0.0;

  if (station.soglia1 > 0 && station.soglia2 === 0 && station.soglia3 === 0) {
    // if `soglia2` and `soglia3` where not provided...
    lowerLimit = station.soglia1;
    upperLimit = 100 * (100 / station.soglia1);
    absoluteUpperLimit = 100;
  } else if (station.value! < station.soglia2) {
    // if the current level is below `soglia2`
    lowerLimit = station.soglia1;
    upperLimit = station.soglia2;
    absoluteUpperLimit = limitSoglia;
  } else if (station.value! < station.soglia3) {
    // if the current level is below `soglia3`
    lowerLimit = station.soglia2;
    upperLimit = station.soglia3;
    absoluteLowerLimit = limitSoglia;
    absoluteUpperLimit = limitSoglia * 2;
  } else {
    // if the current level is above `soglia3`
    lowerLimit = station.soglia3;
    upperLimit = (station.soglia3 * 100) / (limitSoglia * 2);
    absoluteLowerLimit = limitSoglia * 2;
    absoluteUpperLimit = 100;
  }

  const relativePercentage = _relativePercentage(
    station.value!,
    lowerLimit,
    upperLimit,
  );

  return _absolutePercentage(
    relativePercentage,
    absoluteLowerLimit,
    absoluteUpperLimit,
  );
};
</script>

<template>
  <div class="flex flex-col space-y-2 border-b border-gray-200 py-2">
    <div class="flex flex-row pr-3">
      <UiBookmark :idstazione="station.idstazione" />
      <div class="flex-1 flex-row self-center">
        <div class="text-sm leading-none">NOME</div>
        <div class="text-xl font-bold leading-none">
          {{ station.nomestaz }}
        </div>
      </div>
      <div
        v-if="station.value !== null"
        :class="[
          threshold1(station) ? 'text-threshold1' : '',
          threshold2(station) ? 'text-threshold2' : '',
          threshold3(station) ? 'text-threshold3' : '',
          'self-center text-3xl font-bold',
        ]"
      >
        {{ station.value }} m
      </div>
    </div>
    <UiThresholdBar
      v-if="hasThresholds(station) && station.value !== null"
      :percentage="cursorPercentage(station)"
      :threshold1="station.soglia1"
      :threshold2="station.soglia2"
      :threshold3="station.soglia3"
    />
    <div
      v-else-if="!hasThresholds(station) && station.value !== null"
      class="flex h-12 flex-row items-center space-x-2 self-center text-wrap fill-green-500 align-middle font-bold text-green-500"
    >
      <div><IconsSlideText /></div>
      <div>SOGLIE DI ALLERTA NON DISPONIBILI</div>
    </div>
    <div
      v-else-if="!station.value"
      class="flex h-12 flex-row items-center space-x-2 self-center text-wrap fill-amber-500 align-middle font-bold text-amber-500"
    >
      <div><IconsWarning /></div>
      <div>DATO NON DISPONIBILE</div>
    </div>
    <div
      v-else
      class="h-12"
    >
      &nbsp;
    </div>
  </div>
</template>

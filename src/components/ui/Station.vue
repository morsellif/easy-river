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
    station.value >= station.soglia1 &&
    station.value < station.soglia2
  );
};

const threshold2 = (station: Station) => {
  return (
    hasThresholds(station) &&
    station.value >= station.soglia2 &&
    station.value < station.soglia3
  );
};

const threshold3 = (station: Station) => {
  return (
    hasThresholds(station) &&
    station.soglia3 !== 0 &&
    station.value >= station.soglia3
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
  } else if (station.value < station.soglia2) {
    // if the current level is below `soglia2`
    lowerLimit = station.soglia1;
    upperLimit = station.soglia2;
    absoluteUpperLimit = limitSoglia;
  } else if (station.value < station.soglia3) {
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
    station.value,
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
  <div class="flex flex-col space-y-2 pb-4 pt-4">
    <div class="flex flex-row">
      <div class="flex-1 flex-row">
        <div class="text-sm">NOME</div>
        <div class="text-xl font-bold">{{ station.nomestaz }}</div>
      </div>
      <div
        :class="[
          threshold1(station) ? 'text-threshold1' : '',
          threshold2(station) ? 'text-threshold2' : '',
          threshold3(station) ? 'text-threshold3' : '',
          'text-3xl font-bold',
        ]"
      >
        {{ station.value }} m
      </div>
    </div>
    <UiThresholdBar
      v-if="hasThresholds(station)"
      :percentage="cursorPercentage(station)"
      :threshold1="station.soglia1"
      :threshold2="station.soglia2"
      :threshold3="station.soglia3"
    />
    <div
      v-else
      class="flex"
    >
      &nbsp;
    </div>
  </div>
</template>

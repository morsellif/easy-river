<script setup lang="ts">
const time = ref<Time | null>(null);
const stations = ref<Station[]>([]);

const { data } = useFetch<NoTimeResponse>(
  () =>
    'https://allertameteo.regione.emilia-romagna.it/o/api/allerta/get-sensor-values-no-time',
  {
    query: {
      variabile: '254,0,0/1,-,-,-/B13215',
      time: '1709370000000',
    },
  },
);

if (data) {
  time.value = data.value?.shift() as Time;
  stations.value = data.value as Station[];
}

const fromEpochToDate = (time: Time) => {
  const epoch = parseInt(time.time, 10);
  const date = new Date(epoch);

  return date;
};
</script>

<template>
  <client-only>
    <div class="container mx-auto h-full w-96">
      <div class="h-full divide-y-2 overflow-y-scroll">
        {{ fromEpochToDate(time!).toLocaleString('it-IT') }}
        <UiStation
          v-for="stat in stations"
          :key="stat.idstazione"
          :station="stat"
        />
      </div>
    </div>
  </client-only>
</template>

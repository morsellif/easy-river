<script setup lang="ts">
const time = ref<Time | null>(null);
const stations = ref<Station[]>([]);

const backInTime = () => {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - 1);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  return currentDate;
};

const { data } = useFetch<NoTimeResponse>(
  () =>
    'https://allertameteo.regione.emilia-romagna.it/o/api/allerta/get-sensor-values-no-time',
  {
    query: {
      variabile: '254,0,0/1,-,-,-/B13215',
      time: backInTime().getTime(),
    },
  },
);

if (data) {
  time.value = data.value?.shift() as Time;
  stations.value = data.value as Station[];
}

const _fromEpochToDate = (time: Time) => {
  const epoch = parseInt(time.time, 10);
  const date = new Date(epoch);

  return date;
};
</script>

<template>
  <client-only>
    <div class="container mx-auto h-full w-96">
      <div class="h-full divide-y-2 overflow-y-scroll">
        <div
          class="flex space-x-3 rounded-full border border-green-300 bg-green-100 px-2 py-1"
        >
          <div
            class="ml-2 h-2 w-2 animate-ping self-center rounded-full bg-green-400"
          ></div>
          <div class="font-medium text-green-600">
            {{ backInTime().toLocaleString('it-IT') }}
          </div>
        </div>
        <UiStation
          v-for="stat in stations"
          :key="stat.idstazione"
          :station="stat"
        />
      </div>
    </div>
  </client-only>
</template>

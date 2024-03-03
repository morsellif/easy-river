<script setup lang="ts">
interface Time {
  time: string;
}
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

type ComposedData = Time | Station;

const time = ref<Time | null>(null);
const stations = ref<Station[]>([]);
/* const testStation = ref<Station>({
  idstazione: 'test',
  ordinamento: 9999,
  nomestaz: 'Test',
  lat: '0',
  lon: '0',
  value: 6,
  soglia1: 1.3,
  soglia2: 1.8,
  soglia3: 2.8,
}); */

const { data } = useFetch<ComposedData[]>(
  () =>
    'https://allertameteo.regione.emilia-romagna.it/o/api/allerta/get-sensor-values-no-time',
  {
    query: {
      variabile: '254,0,0/1,-,-,-/B13215',
      time: '1709370000000',
    },
  },
);

/* watch(pending, (updatedValue) => {
  if (updatedValue && !error) {
    time.value = data.value?.shift() as Time;
    stations.value = data.value as Station[];
  }
}); */

if (data) {
  time.value = data.value?.shift() as Time;
  stations.value = data.value as Station[];
}

// if (data) {
//   time.value = data.value?.shift() as Returned;
//   data.value?.shift();
//   multiPropData.value = data.value as Returned1[];
// }

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
        {{ fromEpochToDate(time!) }}
        <UiStation
          v-for="stat in stations"
          :key="stat.idstazione"
          :station="stat"
        />
      </div>
    </div>
  </client-only>
</template>

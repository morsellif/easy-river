<script setup lang="ts">
const time = ref<Time | null>(null);
const stations = ref<Station[]>([]);

const { data } = useFetch<NoTimeResponse>('/api/stations');

if (data) {
  time.value = data.value?.shift() as Time;
  stations.value = data.value as Station[];
}

const _fromEpochToDate = (time: Time) => {
  const epoch = parseInt(time.time, 10);
  const date = new Date(epoch);

  return date;
};

const store = useEasyRiverStore();
const { filterBookmarks, bookamrkSet, search, searchQuery } =
  storeToRefs(store);

const filteredStations = computed(() => {
  if (filterBookmarks.value && search.value) {
    return stations.value
      .filter((station) => bookamrkSet.value.has(station.idstazione))
      .filter((station) =>
        station.nomestaz
          .toLocaleLowerCase()
          .includes(searchQuery.value.toLocaleLowerCase()),
      );
  } else if (filterBookmarks.value && !search.value) {
    return stations.value.filter((station) =>
      bookamrkSet.value.has(station.idstazione),
    );
  } else if (!filterBookmarks.value && search.value) {
    return stations.value.filter((station) =>
      station.nomestaz
        .toLocaleLowerCase()
        .includes(searchQuery.value.toLocaleLowerCase()),
    );
  } else {
    return stations.value;
  }

  // return filterBookmarks.value
  //   ? stations.value.filter((station) =>
  //       bookamrkSet.value.has(station.idstazione),
  //     )
  //   : stations.value;
});
</script>

<template>
  <UiContainer>
    <UiHeader />
    <client-only>
      <UiDisclamier />
      <UiList
        v-if="filteredStations"
        :time="time?.time"
      >
        <UiStation
          v-for="stat in filteredStations.sort(
            (a, b) => a.ordinamento - b.ordinamento,
          )"
          :key="stat.idstazione"
          :station="stat"
        />
      </UiList>
    </client-only>
    <div class="h-[30px]"></div>
  </UiContainer>
</template>

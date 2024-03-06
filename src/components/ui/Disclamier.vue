<script setup lang="ts">
const store = useEasyRiverStore();
const { showDisclamier } = storeToRefs(store);
</script>

<template>
  <div
    v-if="showDisclamier"
    class="space-y-1 rounded-3xl border border-amber-300 bg-amber-100 p-3 drop-shadow-sm"
  >
    <div
      class="flex flex-row items-center space-x-2 self-center text-wrap fill-amber-500 align-middle font-bold text-amber-500"
    >
      <div><IconsWarning /></div>
      <div>ATTENZIONE</div>
    </div>
    <div>
      I dati relativi al livello idrometrico mostrati da questa applicazione
      sono forniti dall'API di
      <a
        href="https://allertameteo.regione.emilia-romagna.it/livello-idrometrico"
        class="text-amber-700 underline decoration-solid underline-offset-4"
        target="_blank"
      >
        <b>Allerta Meteo Emilia-Romagna</b>
      </a>
      e sono usati esclusivamente a scopo informativo.
      <br />
      <b class="text-amber-700">
        Non possiamo garantire l'accuratezza, l'affidabilità o la completezza
        dei dati.
      </b>
    </div>
    <button
      class="w-full rounded-3xl border border-amber-200 py-1 text-center font-bold text-amber-900 hover:border-amber-300 hover:bg-amber-200 active:border-amber-400 active:bg-amber-200"
      @click="store.toggleDisclamier()"
    >
      ACCETTA E NON MOSTRARE PIÙ
    </button>
  </div>
</template>

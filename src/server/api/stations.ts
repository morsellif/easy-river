const backInTime = () => {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - 1);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  return currentDate;
};

export default defineEventHandler(async (_event) => {
  const data = await $fetch<NoTimeResponse>(
    'https://allertameteo.regione.emilia-romagna.it/o/api/allerta/get-sensor-values-no-time',
    {
      method: 'GET',
      query: {
        variabile: '254,0,0/1,-,-,-/B13215',
        time: backInTime().getTime(),
      },
    },
  );

  return data;
});

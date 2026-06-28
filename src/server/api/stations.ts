import { addHours } from 'date-fns';

const currentHourUTCEpoch = () => {
  const currentDate = new Date();
  if (currentDate.getMinutes() <= 30) {
    currentDate.setMinutes(30, 0, 0);
  } else {
    const nextHour = addHours(currentDate, 1);
    nextHour.setMinutes(0, 0, 0);
    return nextHour.getTime();
  }

  return currentDate.getTime();
};

export default defineEventHandler(async (_event) => {
  // get the latest most complete stations data
  const epoch = currentHourUTCEpoch().toString();

  const data = await $fetch<NoTimeResponse>(
    'https://allertameteo.regione.emilia-romagna.it/o/api/allerta/get-sensor-values-no-time',
    {
      method: 'POST',
      query: {
        variabile: '254,0,0/1,-,-,-/B13215',
        time: epoch,
      },
      params: {
        ts: epoch,
        latestAvailabelTimeIsKnown: 'false',
        time: epoch,
      },
    },
  );

  return data;
});

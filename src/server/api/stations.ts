import { addHours, differenceInSeconds } from 'date-fns';

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

// Helper to calculate exactly how many seconds are left until the next window
const getSecondsUntilNextEpoch = () => {
  const now = new Date();
  const target = new Date();

  if (now.getMinutes() <= 30) {
    // If we are before XX:30, the current window ends at exactly XX:30
    target.setMinutes(30, 0, 0);
  } else {
    // If we are past XX:30, the current window ends at the next hour XX:00
    const nextHour = addHours(now, 1);
    nextHour.setMinutes(0, 0, 0);
    return differenceInSeconds(nextHour, now);
  }

  return differenceInSeconds(target, now);
};

export default defineCachedEventHandler(
  async (event) => {
    // get the latest most complete stations data
    const epoch = currentHourUTCEpoch().toString();

    const secondsLeft = Math.max(getSecondsUntilNextEpoch(), 1);
    setResponseHeader(event, 'Cache-Control', `public, max-age=${secondsLeft}`);

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
  },
  {
    name: 'emiliaRomagnaRiverSensorData',
    getKey: () => currentHourUTCEpoch().toString(),
    swr: false,
    maxAge: 30 * 60,
  },
);

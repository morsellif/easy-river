import { addHours } from 'date-fns';

import { redis, keyParser, isCaching } from './../../utils/redis';

const currentHourUTCEpoch = () => {
  const currentDate = new Date();
  if (currentDate.getMinutes() <= 30) {
    currentDate.setMinutes(30, 0, 0);
  } else {
    addHours(currentDate, 1);
    currentDate.setMinutes(0, 0, 0);
  }

  return currentDate.getTime();
};

export default defineEventHandler(async (_event) => {
  // get the latest most complete stations data
  const epoch = currentHourUTCEpoch().toString();

  const fromCache = isCaching()
    ? await redis.get<string>(keyParser(epoch))
    : null;
  if (!fromCache) {
    console.log('Data not found in cache...');
    console.log('Fetching new data...');
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

    if (isCaching()) {
      // using transaction to optimize Redis server calls
      const transaction = redis.multi();
      transaction.set(keyParser(epoch), JSON.stringify(data));
      transaction.expire(keyParser(epoch), 30 * 60);

      console.log('Saving new data to cache...');
      const _result = await transaction.exec();
    }

    return data;
  } else {
    console.log('Data found in cache...');
    return fromCache;
  }
});

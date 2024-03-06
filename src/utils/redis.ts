import { Redis } from '@upstash/redis';

const UPSTASH_REDIS_REQUEST_URL = process.env.UPSTASH_REDIS_REQUEST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const REDIS_PREFIX = process.env.REDIS_PREFIX || 'LOCALDEV';

if (!UPSTASH_REDIS_REQUEST_URL) {
  console.warn(
    'You have not configured `UPSTASH_REDIS_REQUEST_URL` env variable',
  );
  console.warn('Request caching could not be enabled.');
}

if (!UPSTASH_REDIS_REST_TOKEN) {
  console.warn(
    'You have not configured `UPSTASH_REDIS_REST_TOKEN` env variable.',
  );
  console.warn('Request caching could not be enabled.');
}

export const isCaching = () =>
  UPSTASH_REDIS_REQUEST_URL && UPSTASH_REDIS_REST_TOKEN;

export const redis = new Redis({
  url: UPSTASH_REDIS_REQUEST_URL || 'NO_URL',
  token: UPSTASH_REDIS_REST_TOKEN || 'NO_TOKEN',
});

export const keyParser = (key: string) => `${key}_${REDIS_PREFIX}`;

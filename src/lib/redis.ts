import { Redis } from '@upstash/redis';

const CANDIDATES: [string, string][] = [
  ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
  ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
  ['STORAGE_REST_API_URL', 'STORAGE_REST_API_TOKEN'],
  ['STORAGE_KV_REST_API_URL', 'STORAGE_KV_REST_API_TOKEN'],
  ['UPSTASH_REDIS_KV_REST_API_URL', 'UPSTASH_REDIS_KV_REST_API_TOKEN'],
];

let cached: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (cached !== undefined) return cached;
  for (const [u, t] of CANDIDATES) {
    const url = process.env[u];
    const token = process.env[t];
    if (url && token) {
      cached = new Redis({ url, token });
      return cached;
    }
  }
  cached = null;
  return null;
}

export const isStoreConfigured = () => getRedis() !== null;

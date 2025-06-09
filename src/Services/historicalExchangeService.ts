const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const getCacheKey = (currency: string, date: string) => {
  return `rate_${currency}_${date}`;
};

type CachedRate = {
  rate: number;
  timestamp: number; // ms since epoch
};

// Get from cache or null if expired/not found
export const getCachedRate = (
  currency: string,
  date: string
): number | null => {
  const key = getCacheKey(currency, date);
  const cachedRaw = localStorage.getItem(key);

  if (cachedRaw) {
    try {
      const cached: CachedRate = JSON.parse(cachedRaw);
      if (Date.now() - cached.timestamp < ONE_DAY_MS) {
        return cached.rate;
      } else {
        localStorage.removeItem(key); // expired
      }
    } catch {
      localStorage.removeItem(key); // malformed
    }
  }
  return null;
};

// Set cache
export const cacheRate = (currency: string, date: string, rate: number) => {
  const key = getCacheKey(currency, date);
  const cached: CachedRate = { rate, timestamp: Date.now() };
  localStorage.setItem(key, JSON.stringify(cached));
};

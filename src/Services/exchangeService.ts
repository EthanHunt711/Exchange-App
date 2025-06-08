export const isStaleRate = (dateStr: string | null | undefined): boolean => {
  if (!dateStr) return true;
  const then = new Date(dateStr).getTime();
  if (isNaN(then)) return true; // if invalid date, consider it stale
  const now = Date.now();
  return now - then > 24 * 60 * 60 * 1000;
};

export const getLocalRate = (to: String, from: string) => {
  const key = `exchange_rate-${from}-${to}`;
  const data = localStorage.getItem(key);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

export const setLocalRate = (from: string, to: string, rate: number) => {
  const key = `exchange_rate-${from}-${to}`;
  localStorage.setItem(
    key,
    JSON.stringify({ rate, date: new Date().toISOString() })
  );
};

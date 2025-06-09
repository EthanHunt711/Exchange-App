import axios from "axios"; // Use direct axios, or your instance if CORS/proxy is set up
import {
  getCachedRate,
  cacheRate,
} from "../Services/historicalExchangeService.js";

const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

// NOTE: No apikey in data, you can configure it in your .env or axios baseURL if needed
export const fetchRate = async (
  currency: string,
  date: string,
  amount: number = 1
): Promise<number> => {
  const cached = getCachedRate(currency, date);
  if (cached !== null) {
    return cached;
  }

  // Split date to Y/M/D
  const [year, month, day] = date.split("-").map(Number);

  // Your endpoint: /history/USD/YEAR/MONTH/DAY/AMOUNT
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/history/${currency}/${year}/${month}/${day}/${amount}`;

  const res = await axios.get(url);
  const rate = res.data.conversion_amounts["SEK"]; // Adjust if your API returns a different key
  if (rate !== undefined) {
    cacheRate(currency, date, rate);
    return rate;
  } else {
    throw new Error("Rate not found in API response");
  }
};

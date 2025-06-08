import axios from "axios";
import {
  getLocalRate,
  setLocalRate,
  isStaleRate,
} from "../Services/exchangeService";

// Put your key in .env as VITE_EXCHANGE_RATE_API_KEY (Vite convention)
const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

export const fetchConversionRate = async (
  from: string,
  to: string
): Promise<number> => {
  const cached = getLocalRate(from, to);
  if (cached && !isStaleRate(cached.date)) {
    return cached.rate;
  }
  // API call
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`;
  const { data } = await axios.get(url);
  console.log("API Response:", data);
  if (data.result === "success") {
    setLocalRate(from, to, data.conversion_rate);
    return data.conversion_rate;
  }
  throw new Error(data["error-type"] || "API Error");
};

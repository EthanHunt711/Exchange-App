import axios from "axios"; // Your configured axios instance

// Get all transactions for a user
export const fetchTransactions = async (userId: string) => {
  const res = await axios.get("/transactions", { params: { userId } });
  return res.data;
};

// Add a new transaction
export const addTransaction = async (
  userId: string,
  tx: {
    type: string;
    currency: string;
    amount: number;
    rate: number;
    timestamp: string;
    details?: any;
  }
) => {
  const res = await axios.post(
    "/transactions",
    { ...tx },
    { headers: { userId } }
  );
  return res.data;
};

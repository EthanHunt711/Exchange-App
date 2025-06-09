import {
  fetchTransactions,
  addTransaction,
} from "../Services/transactionService";
import { ref } from "vue";

export const useTransactionController = (userId: string) => {
  const transactions = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadTransactions = async () => {
    loading.value = true;
    error.value = null;
    try {
      transactions.value = await fetchTransactions(userId);
    } catch (err: any) {
      error.value = err?.message || "Failed to fetch transactions";
    } finally {
      loading.value = false;
    }
  };

  const createTransaction = async (tx: {
    type: string;
    currency: string;
    amount: number;
    rate: number;
    timestamp: string;
    details?: any;
  }) => {
    loading.value = true;
    error.value = null;
    try {
      await addTransaction(userId, tx);
      await loadTransactions(); // refresh after adding
    } catch (err: any) {
      error.value = err?.message || "Failed to add transaction";
    } finally {
      loading.value = false;
    }
  };

  return {
    transactions,
    loading,
    error,
    loadTransactions,
    createTransaction,
  };
};

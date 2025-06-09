<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import axios from "axios";
import Wallet from "../components/WalletOverview.vue";
import addTransaction from "../components/AddTransaction.vue";
import Card from "primevue/card";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";

const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const { user, isAuthenticated } = useAuth0();

const wallet = ref<any>(null);
const transactions = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const creating = ref(false);

const adding = ref(false);

const fetchWallet = async () => {
  if (!user.value?.sub) return;
  loading.value = true;
  error.value = null;
  try {
    const res = await axios.get(`${url}/api/wallet`, {
      params: { userId: user.value.sub },
    });
    wallet.value = res.data;
  } catch (e: any) {
    if (e.response?.status === 404) {
      wallet.value = null;
    } else {
      error.value = e.message;
    }
  } finally {
    loading.value = false;
  }
};

const fetchTransactions = async () => {
  if (!user.value?.sub) return;
  loading.value = true;
  error.value = null;
  try {
    const res = await axios.get(`${url}/api/transactions`, {
      params: { userId: user.value.sub },
    });
    transactions.value = res.data;
  } catch (e: any) {
    if (e.response?.status === 404) {
      transactions.value = [];
    } else {
      error.value = e.message;
    }
  } finally {
    loading.value = false;
  }
};

const createWallet = async () => {
  if (!user.value?.sub) return;
  creating.value = true;
  error.value = null;
  try {
    const res = await axios.post(`${url}/api/wallet/create`, {
      userId: user.value.sub,
    });
    wallet.value = res.data.wallet || res.data;
    await fetchTransactions();
  } catch (e: any) {
    error.value = e.message;
  } finally {
    creating.value = false;
  }
};

const addBalance = async (tx: {
  currency: string;
  amount: number;
  rate: number;
  date_bought: string;
  details?: string;
}) => {
  if (!user.value?.sub || !tx.currency || tx.amount == null || tx.rate == null)
    return;

  adding.value = true;
  error.value = null;
  try {
    const timestamp = new Date().toISOString();
    await axios.post(
      `${url}/api/wallet/update`,
      {
        ...tx, // includes currency, amount, rate, date_bought, details
        timestamp, // always add timestamp
        // Optionally: type: 'deposit' or similar
      },
      { headers: { userid: user.value.sub } }
    );
    await fetchWallet();
    await fetchTransactions();
  } catch (e: any) {
    error.value = e.message;
  } finally {
    adding.value = false;
  }
};

onMounted(() => {
  if (isAuthenticated.value && user.value?.sub) {
    fetchWallet();
    fetchTransactions();
  }
});
</script>

<template>
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="w-full max-w-2xl">
      <div v-if="loading || creating" class="flex flex-col items-center py-20">
        <ProgressSpinner
          style="width: 50px; height: 50px"
          strokeWidth="4"
          animationDuration=".7s"
        />
        <span class="mt-2">Loading your wallet…</span>
      </div>
      <div v-else-if="wallet !== null && wallet.balances">
        <Wallet
          :balances="wallet.balances"
          :transactions="transactions || []"
        />
        <!-- Add Balance Form -->
        <addTransaction
          v-if="isAuthenticated && user && user.sub"
          @add="addBalance"
          :adding="adding"
          :error="error"
        />
      </div>
      <div v-else>
        <Card class="flex flex-col items-center justify-center">
          <template #content>
            <div class="flex flex-col items-center justify-center py-10">
              <Button
                icon="pi pi-plus"
                label="Create a wallet"
                class="p-button-lg p-button-outlined p-button-secondary mb-2"
                @click="createWallet"
                :disabled="creating"
                style="font-size: 1.5rem; padding: 2rem 3rem"
              />
              <div class="flex flex-col items-center mt-4">
                <span v-if="error" class="text-red-500 mt-4">{{ error }}</span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import axios from "axios";
import Wallet from "../components/WalletOverview.vue"; // Import the new Wallet component
import Card from "primevue/card";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";

const { user, isAuthenticated } = useAuth0();

const wallet = ref(null);
const loading = ref(true);
const error = ref<string | null>(null);
const creating = ref(false);

const fetchWallet = async () => {
  if (!user.value?.sub) return;
  loading.value = true;
  error.value = null;
  try {
    const res = await axios.get("/api/wallet", {
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

const createWallet = async () => {
  if (!user.value?.sub) return;
  creating.value = true;
  error.value = null;
  try {
    const res = await axios.post("/api/wallet/create", {
      userId: user.value.sub,
    });
    wallet.value = res.data.wallet || res.data;
  } catch (e: any) {
    error.value = e.message;
  } finally {
    creating.value = false;
  }
};

onMounted(() => {
  if (isAuthenticated.value && user.value?.sub) {
    fetchWallet();
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
      <Wallet v-else-if="wallet" :wallet="wallet" />
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

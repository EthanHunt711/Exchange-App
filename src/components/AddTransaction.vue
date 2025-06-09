<script setup lang="ts">
import { ref } from "vue";
import { fetchConversionRate } from "../controllers/exchangeController";
import Card from "primevue/card";
import Button from "primevue/button";

const popularCurrencies = [
  "USD",
  "EUR",
  "SEK",
  "GBP",
  "JPY",
  "CHF",
  "AUD",
  "CAD",
  "NZD",
];

const emit = defineEmits<{
  (
    e: "add",
    tx: {
      currency: string;
      amount: number;
      rate: number;
      date_bought: string;
      details?: string;
    }
  ): void;
}>();

function getTodayDate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const currency = ref("USD");
const amount = ref<number | null>(null);
const date_bought = ref<string>(getTodayDate());
const details = ref("");
const adding = ref(false);
const error = ref<string | null>(null);

const add = async () => {
  error.value = null;
  if (!currency.value || amount.value == null) {
    error.value = "All fields except details are required";
    return;
  }

  // Check if date_bought is today
  const today = getTodayDate();
  if (date_bought.value !== today) {
    error.value = "Historical conversion rate is not available now.";
    return;
  }

  adding.value = true;
  try {
    // Use today's rate API
    const rateVal = await fetchConversionRate(currency.value, "SEK");
    emit("add", {
      currency: currency.value,
      amount: amount.value,
      rate: rateVal,
      date_bought: date_bought.value,
      details: details.value || undefined,
    });
  } catch (e: any) {
    error.value = e.message || "Failed to fetch today's rate";
  } finally {
    adding.value = false;
  }
};
</script>

<template>
  <Card class="mt-6">
    <template #title>
      <div class="flex items-center gap-2">
        <span class="pi pi-plus" />
        Add Transaction
      </div>
    </template>
    <template #content>
      <form @submit.prevent="add" class="flex flex-col gap-4 w-full">
        <div class="flex flex-wrap gap-2">
          <select
            v-model="currency"
            class="p-2 border rounded min-w-[90px] bg-neutral-900"
          >
            <option v-for="cur in popularCurrencies" :key="cur" :value="cur">
              {{ cur }}
            </option>
          </select>
          <input
            v-model.number="amount"
            placeholder="Amount"
            type="number"
            min="0"
            class="p-2 border rounded min-w-[100px]"
          />
          <input
            v-model="date_bought"
            placeholder="Date Bought"
            type="date"
            class="p-2 border rounded min-w-[130px]"
          />
        </div>
        <textarea
          v-model="details"
          placeholder="Details (optional)"
          rows="2"
          class="p-2 border rounded w-full"
        />
        <div class="flex items-center gap-2">
          <Button
            label="Add Transaction"
            :loading="adding"
            :disabled="adding"
            @click="add"
            class="p-button-sm"
          />
          <span v-if="error" class="text-red-500">{{ error }}</span>
        </div>
      </form>
    </template>
  </Card>
</template>

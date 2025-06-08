<script setup lang="ts">
import { ref } from "vue";
import { fetchConversionRate } from "../controllers/exchangeController";
import Card from "primevue/card";

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

const amount = ref(1);
const from = ref("SEK");
const to = ref("EUR");
const result = ref<number | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const convert = async () => {
  loading.value = true;
  error.value = null;
  try {
    const rate = await fetchConversionRate(from.value, to.value);
    result.value = +(amount.value * rate).toFixed(2);
  } catch (err: any) {
    error.value = err.message || "Conversion failed.";
    result.value = null;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <Card>
      <template #title>
        <div
          class="p-4 bg-neutral-900 text-white rounded-lg shadow max-w-md mx-auto flex flex-col justify-center items-center gap-4"
        >
          <h3 class="font-bold text-lg mb-2 text-center">Quick Converter</h3>
          <div
            class="flex flex-col md:flex-row md:items-end gap-2 w-full justify-center"
          >
            <div class="w-full">
              <label for="amount" class="block text-sm font-medium mb-1">
                Amount
              </label>
              <input
                id="amount"
                v-model.number="amount"
                type="number"
                min="0"
                class="input input-bordered w-full"
                placeholder="Amount"
              />
            </div>
            <select v-model="from" class="input input-bordered bg-neutral-900">
              <option v-for="cur in popularCurrencies" :key="cur" :value="cur">
                {{ cur }}
              </option>
            </select>
            <span class="mx-1">→</span>
            <select v-model="to" class="input input-bordered bg-neutral-900">
              <option v-for="cur in popularCurrencies" :key="cur" :value="cur">
                {{ cur }}
              </option>
            </select>
            <button @click="convert" class="btn btn-primary ml-2">
              Convert
            </button>
          </div>
          <div v-if="result !== null" class="mt-3 font-semibold">
            {{ amount }} {{ from }} ≈ {{ result }} {{ to }}
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

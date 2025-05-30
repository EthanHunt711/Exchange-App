<script setup lang="ts">
import { ref } from "vue";

// Dummy rates for example only
const rates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  SEK: 10.7,
};

const amount = ref(1);
const from = ref("USD");
const to = ref("EUR");
const result = ref<number | null>(null);

function convert() {
  if (rates[from.value] && rates[to.value]) {
    const usd = amount.value / rates[from.value];
    result.value = +(usd * rates[to.value]).toFixed(2);
  } else {
    result.value = null;
  }
}
</script>

<template>
  <div class="p-4 bg-neutral-900 text-white rounded-lg shadow max-w-md">
    <h3 class="font-bold text-lg mb-2">Quick Converter</h3>
    <div class="flex flex-col md:flex-row md:items-end gap-2">
      <input
        v-model.number="amount"
        type="number"
        min="0"
        class="input input-bordered w-full"
        placeholder="Amount"
      />
      <select v-model="from" class="input input-bordered">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="SEK">SEK</option>
      </select>
      <span class="mx-1">→</span>
      <select v-model="to" class="input input-bordered">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="SEK">SEK</option>
      </select>
      <button @click="convert" class="btn btn-primary ml-2">Convert</button>
    </div>
    <div v-if="result !== null" class="mt-3 font-semibold">
      {{ amount }} {{ from }} ≈ {{ result }} {{ to }}
    </div>
  </div>
</template>

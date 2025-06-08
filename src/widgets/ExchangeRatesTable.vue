<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchConversionRate } from "../controllers/exchangeController";

// Display info for these currencies
const majorCurrencies = [
  { name: "US Dollar", code: "USD" },
  { name: "Euro", code: "EUR" },
  { name: "British Pound", code: "GBP" },
  { name: "Japanese Yen", code: "JPY" },
  { name: "Danish Krona", code: "DKK" },
];

const base = "SEK"; // Show rates relative to SEK
const rates = ref<{ [code: string]: number }>({});
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    const results: { [code: string]: number } = {};
    await Promise.all(
      majorCurrencies.map(async (c) => {
        if (c.code === "SEK") {
          results[c.code] = 1;
        } else {
          try {
            // FROM SEK TO c.code
            results[c.code] = await fetchConversionRate(c.code, base);
            console.log(results);
          } catch (e) {
            results[c.code] = NaN;
          }
        }
      })
    );
    rates.value = results;
  } catch (err: any) {
    error.value = err.message || "Failed to fetch rates.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="bg-neutral-900 text-white rounded-lg shadow p-4">
    <h3 class="font-bold text-lg mb-2">
      Major Currencies to SEK Exchange Rates
    </h3>
    <div v-if="loading" class="text-gray-300">Loading…</div>
    <div v-else-if="error" class="text-red-400">{{ error }}</div>
    <table v-else class="min-w-full">
      <thead>
        <tr class="border-b text-left">
          <th class="py-2">Currency</th>
          <th class="py-2">Code</th>
          <th class="py-2">Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in majorCurrencies" :key="r.code" class="border-b">
          <td class="py-1">{{ r.name }}</td>
          <td class="py-1 font-mono">{{ r.code }}</td>
          <td class="py-1 font-semibold">
            1 {{ r.code }} =
            {{ isNaN(rates[r.code]) ? "-" : rates[r.code].toFixed(3) + " SEK" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

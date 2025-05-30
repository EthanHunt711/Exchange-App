<script setup lang="ts">
const rates = [
  { name: "US Dollar", code: "USD", rate: 1 },
  { name: "Euro", code: "EUR", rate: 0.92 },
  { name: "Swedish Krona", code: "SEK", rate: 10.7 },
  { name: "British Pound", code: "GBP", rate: 0.79 },
  { name: "Japanese Yen", code: "JPY", rate: 156.2 },
];
</script>

<template>
  <div class="bg-neutral-900 text-white rounded-lg shadow p-4">
    <h3 class="font-bold text-lg mb-2">Major Currency Rates (vs USD)</h3>
    <table class="min-w-full">
      <thead>
        <tr class="border-b text-left">
          <th class="py-2">Currency</th>
          <th class="py-2">Code</th>
          <th class="py-2">Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rates" :key="r.code" class="border-b">
          <td class="py-1">{{ r.name }}</td>
          <td class="py-1 font-mono">{{ r.code }}</td>
          <td class="py-1 font-semibold">{{ r.rate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

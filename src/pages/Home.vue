<script setup lang="ts">
import ExchangeRatesTable from "../widgets/ExchangeRatesTable.vue";
import RecentTrendsChart from "../widgets/RecentTrendsChart.vue";
</script>
<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-2">Currency Exchange Rates</h1>
    <p class="text-lg text-gray-600 mb-6">
      Get the latest exchange rates, convert currencies, and view trends!
    </p>

    <!-- Main Exchange Rates Table -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Major Currencies</h2>
      <ExchangeRatesTable />
    </div>

    <!-- Recent Trends Chart -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Recent USD Trends</h2>
      <RecentTrendsChart />
    </div>
  </div>
</template>

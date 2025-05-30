<script setup lang="ts">
import Chart from "primevue/chart";

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "USD/EUR",
      data: [0.91, 0.92, 0.91, 0.93, 0.94, 0.92, 0.92],
      fill: false,
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { beginAtZero: false },
  },
};
</script>

<template>
  <div class="bg-neutral-900 text-white rounded-lg shadow p-4">
    <h3 class="font-bold text-lg mb-2">USD/EUR Last 7 Days</h3>
    <Chart
      type="line"
      :data="chartData"
      :options="options"
      class="w-full h-60"
    />
  </div>
</template>

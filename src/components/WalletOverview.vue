<script setup lang="ts">
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import { computed, defineProps } from "vue";

type Transaction = {
  type: string;
  currency: string;
  amount: number;
  timestamp: string;
  details?: any;
};

const props = defineProps<{
  balances: Record<string, number>;
  transactions: Transaction[];
}>();

const balancesArray = computed(() =>
  Object.entries(props.balances || {}).map(([currency, amount]) => ({
    currency,
    amount,
  }))
);

const typeColor = (type: string) => {
  switch (type) {
    case "deposit":
      return "success";
    case "withdraw":
      return "danger";
    case "exchange":
      return "info";
    default:
      return "secondary";
  }
};
</script>

<template>
  <Card>
    <template #title>
      <div class="flex items-center gap-2">
        <span class="pi pi-wallet text-xl" />
        Wallet Overview
      </div>
    </template>
    <template #content>
      <!-- Balances -->
      <div class="mb-6">
        <h3 class="font-bold mb-2">Balances</h3>
        <div v-if="balancesArray.length">
          <ul class="flex flex-wrap gap-4">
            <li
              v-for="{ currency, amount } in balancesArray"
              :key="currency"
              class="flex items-center gap-2"
            >
              <Tag :value="currency" class="font-mono text-base" />
              <span class="font-semibold text-lg">{{ amount }}</span>
            </li>
          </ul>
        </div>
        <div v-else class="text-gray-400">No balances yet.</div>
      </div>

      <!-- Transactions -->
      <div>
        <h3 class="font-bold mb-2">Transactions</h3>
        <DataTable
          v-if="transactions && transactions.length"
          :value="transactions"
          responsiveLayout="scroll"
          class="w-full"
        >
          <Column field="timestamp" header="Time">
            <template #body="{ data }">
              {{ new Date(data.timestamp).toLocaleString() }}
            </template>
          </Column>
          <Column field="type" header="Type">
            <template #body="{ data }">
              <Tag :value="data.type" :severity="typeColor(data.type)" />
            </template>
          </Column>
          <Column field="currency" header="Currency" />
          <Column field="amount" header="Amount" />
          <Column field="details" header="Details">
            <template #body="{ data }">
              {{ data.details ? JSON.stringify(data.details) : "-" }}
            </template>
          </Column>
        </DataTable>
        <div v-else class="text-gray-400">No transactions yet.</div>
      </div>
    </template>
  </Card>
</template>

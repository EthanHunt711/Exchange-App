<script setup lang="ts">
import Menubar from "primevue/menubar";

const leftItems = [
  { label: "Home", icon: "pi pi-home", to: "/" },
  { label: "Dashboard", icon: "pi pi-th-large", to: "/dashboard" },
  { label: "Convert", icon: "pi pi-dollar", to: "/convert" },
  { label: "History", icon: "pi pi-calendar", to: "/history" },
  { label: "About", icon: "pi pi-info-circle", to: "/about" },
];

const rightItems = [
  { label: "Login", icon: "pi pi-sign-in", to: "/login" },
  { label: "Register", icon: "pi pi-user-plus", to: "/register" },
  // Later add: { label: "Logout", icon: "pi pi-sign-out", to: "/logout" }
];
</script>

<template>
  <Menubar :model="leftItems" class="mb-6 shadow w-full mt-4">
    <template #item="{ item, props }">
      <!-- ...your custom router-link code here (as before)... -->
      <router-link
        v-if="item.to"
        v-bind="props.action"
        :to="item.to"
        custom
        v-slot="{ navigate, href, isActive }"
      >
        <a
          :href="href"
          @click="navigate"
          class="flex items-center gap-2 px-4 py-2"
          :class="isActive ? 'text-blue-600 font-bold' : ''"
        >
          <span v-if="item.icon" :class="[item.icon, 'text-lg']" />
          <span>{{ item.label }}</span>
        </a>
      </router-link>
      <a
        v-else
        v-bind="props.action"
        :href="item.url"
        class="flex items-center gap-2 px-4 py-2"
      >
        <span v-if="item.icon" :class="[item.icon, 'text-lg']" />
        <span>{{ item.label }}</span>
      </a>
    </template>

    <!-- Right-aligned (end slot) -->
    <template #end>
      <Menubar :model="rightItems">
        <template #item="{ item, props }">
          <router-link
            v-if="item.to"
            v-bind="props.action"
            :to="item.to"
            custom
            v-slot="{ navigate, href, isActive }"
          >
            <a
              :href="href"
              @click="navigate"
              class="flex items-center gap-2 px-4 py-2"
              :class="isActive ? 'text-blue-600 font-bold' : ''"
            >
              <span v-if="item.icon" :class="[item.icon, 'text-lg']" />
              <span>{{ item.label }}</span>
            </a>
          </router-link>
          <a
            v-else
            v-bind="props.action"
            :href="item.url"
            class="flex items-center gap-2 px-4 py-2"
          >
            <span v-if="item.icon" :class="[item.icon, 'text-lg']" />
            <span>{{ item.label }}</span>
          </a>
        </template>
      </Menubar>
    </template>
  </Menubar>
</template>

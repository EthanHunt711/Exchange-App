<script setup lang="ts">
import Menubar from "primevue/menubar";
import { computed } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
const { isAuthenticated, logout, user } = useAuth0();

type MenuItem = {
  label: string;
  icon: string;
  to?: string;
  url?: string;
  action?: () => void;
};

const leftItems: MenuItem[] = [
  { label: "Home", icon: "pi pi-home", to: "/" },
  { label: "Dashboard", icon: "pi pi-th-large", to: "/dashboard" },
  { label: "Convert", icon: "pi pi-dollar", to: "/convert" },
  { label: "History", icon: "pi pi-calendar", to: "/history" },
  { label: "About", icon: "pi pi-info-circle", to: "/about" },
];

const rightItems = computed<MenuItem[]>(() => {
  if (isAuthenticated.value) {
    return [
      // Optionally show user info
      ...(user.value
        ? [
            {
              label: user.value.name || user.value.email || "User",
              icon: "pi pi-user",
              url: "#", // Not clickable, just for display
            },
          ]
        : []),
      {
        label: "Logout",
        icon: "pi pi-sign-out",
        action: () =>
          logout({ logoutParams: { returnTo: window.location.origin } }),
      },
    ];
  } else {
    return [
      { label: "Login", icon: "pi pi-sign-in", to: "/login" },
      { label: "Register", icon: "pi pi-user-plus", to: "/register" },
    ];
  }
});
</script>

<template>
  <Menubar :model="leftItems" class="mb-6 shadow w-full mt-4">
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
          :class="[
            isActive ? 'text-blue-600 font-bold bg-gray-400 rounded' : '',
            'transition-colors',
          ]"
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
          <!-- Use router-link for navigation items -->
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
              :class="[
                isActive ? 'text-blue-600 font-bold bg-gray-400 rounded' : '',
                'transition-colors',
              ]"
            >
              <span v-if="item.icon" :class="[item.icon, 'text-lg']" />
              <span>{{ item.label }}</span>
            </a>
          </router-link>
          <!-- Use button for logout -->
          <a
            v-else-if="item.action"
            v-bind="props.action"
            href="#"
            @click.prevent="item.action"
            class="flex items-center gap-2 px-4 py-2 cursor-pointer"
          >
            <span v-if="item.icon" :class="[item.icon, 'text-lg']" />
            <span>{{ item.label }}</span>
          </a>
          <!-- Use anchor for non-router items -->
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

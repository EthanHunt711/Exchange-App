<script setup lang="ts">
import Menubar from "primevue/menubar";
import { computed } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
const { isAuthenticated, logout, user } = useAuth0();

type MenuItem = {
  label?: string;
  icon?: string;
  to?: string;
  url?: string;
  action?: () => void;
  separator?: boolean;
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

// All items combined for mobile
const allMenuItems = computed<MenuItem[]>(() => {
  if (isAuthenticated.value) {
    return [
      ...leftItems,
      { separator: true },
      ...(user.value
        ? [
            {
              label: user.value.name || user.value.email || "User",
              icon: "pi pi-user",
              url: "#",
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
      ...leftItems,
      { separator: true },
      { label: "Login", icon: "pi pi-sign-in", to: "/login" },
      { label: "Register", icon: "pi pi-user-plus", to: "/register" },
    ];
  }
});
</script>

<template>
  <!-- MOBILE: single combined menu -->
  <div class="block sm:hidden w-full">
    <Menubar :model="allMenuItems" class="mb-6 shadow w-full mt-4">
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
          v-else-if="item.action"
          v-bind="props.action"
          href="#"
          @click.prevent="item.action"
          class="flex items-center gap-2 px-4 py-2 cursor-pointer"
        >
          <span v-if="item.icon" :class="[item.icon, 'text-lg']" />
          <span>{{ item.label }}</span>
        </a>
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
  </div>

  <!-- DESKTOP: left menu + right menu -->
  <div class="hidden sm:flex w-full items-center mb-6 shadow mt-4">
    <!-- Left Menubar (leftItems) -->
    <Menubar :model="leftItems" class="flex-1 bg-transparent shadow-none">
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
    </Menubar>
    <!-- Right Menubar (rightItems) -->
    <div class="ml-auto">
      <Menubar :model="rightItems" class="bg-transparent shadow-none">
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
            v-else-if="item.action"
            v-bind="props.action"
            href="#"
            @click.prevent="item.action"
            class="flex items-center gap-2 px-4 py-2 cursor-pointer"
          >
            <span v-if="item.icon" :class="[item.icon, 'text-lg']" />
            <span>{{ item.label }}</span>
          </a>
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
    </div>
  </div>
</template>

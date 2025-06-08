<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useRoute, useRouter } from "vue-router";
import { watchEffect } from "vue";

const { isAuthenticated, isLoading } = useAuth0();
const route = useRoute();
const router = useRouter();

watchEffect(() => {
  // If authenticated, and not already on dashboard, and on login/register, redirect!
  if (
    !isLoading.value &&
    isAuthenticated.value &&
    ["/", "/login", "/register"].includes(route.path)
  ) {
    router.replace("/dashboard");
  }
});
</script>

<template>
  <Navbar />
  <div class="m-2">
    <router-view />
  </div>
</template>

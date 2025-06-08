<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
const { loginWithRedirect } = useAuth0();

const login = () => loginWithRedirect();
</script>

<template>
  <div
    class="max-w-md mx-auto p-6 rounded shadow bg-white dark:bg-gray-800 dark:text-white"
  >
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <Button class="btn btn-primary w-full mb-2" @click="login">
      Log in with Auth0
    </Button>
    <router-link
      to="/register"
      class="text-blue-500 underline block text-center mt-2"
    >
      New here? Register
    </router-link>
  </div>
</template>

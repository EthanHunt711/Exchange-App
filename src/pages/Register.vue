<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
const { loginWithRedirect } = useAuth0();

const handleRegister = () => {
  loginWithRedirect({
    authorizationParams: { screen_hint: "signup" },
    appState: { target: "/dashboard" },
  });
};

const handleLogin = () => {
  loginWithRedirect({
    appState: { target: "/dashboard" },
  });
};
</script>

<template>
  <div
    class="flex flex-col gap-4 max-w-sm mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow text-center"
  >
    <Button class="btn btn-primary w-full" @click="handleRegister">
      Register with Auth0
    </Button>
    <Button class="btn btn-secondary w-full" @click="handleLogin">
      Already have an account? Log in
    </Button>
  </div>
</template>

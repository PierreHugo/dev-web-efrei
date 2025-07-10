<template>
  <div>
    <div v-if="userStore.isGoogleFitConnected">
      <h1>Accueil</h1>
    </div>
    <div v-else>
      <LoginPage></LoginPage>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import LoginPage from '@/pages/LoginPage.vue'

const userStore = useUserStore();
</script>

<template>
  <div>
    <div v-if="userStore.isGoogleFitConnected">
      <h1>Accueil</h1>
      <p>Vous êtes connecté à Google Fit.</p>
      <button @click="goToGoogleFit">Afficher mes données google fit</button>
      <button @click="goToDailyJournal">Afficher mon journal quotidien</button>
    </div>
    <div v-else>
      <LoginPage></LoginPage>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'

const userStore = useUserStore();
const router = useRouter();

const goToGoogleFit = () => {
  router.push('/google-fit')
}

const goToDailyJournal = () => {
  router.push('/daily-journal')
}
</script>

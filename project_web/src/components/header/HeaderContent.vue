<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import BaseButton from '@/components/BaseButton.vue'

const userStore = useUserStore()
const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div>
    <nav>
      <div class="left">
        <div v-if="userStore.isMicrosoftConnected">
          Bienvenue, {{ userStore.profile.displayName }}
        </div>
        <div v-if="userStore.isGoogleFitConnected">
          Synchronisé à Google Fit
        </div>
      </div>
      <div class="right">
        <button @click="goHome">Accueil</button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.right {
  align-items: center;
  color: white;
}
</style>

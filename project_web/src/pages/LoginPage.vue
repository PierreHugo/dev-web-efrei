<template>
  <div class="centered-container">
    <BaseButton
      v-if="!userStore.isMicrosoftConnected"
      @click="handleSignIn"
    >
      Se connecter à Microsoft
    </BaseButton>
    <BaseButton
      v-else-if="!userStore.isGoogleFitConnected"
      @click="handleGoogleFit"
    >
      Se connecter à Google Fit
    </BaseButton>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { signInAndGetUser, getToken, getUserProfile } from "@/lib/microsoftGraph.js";
import BaseButton from '@/components/BaseButton.vue'
import { ref, onMounted, onUnmounted } from "vue";

const userStore = useUserStore()
const googleFitAccessToken = ref(null)

async function handleSignIn() {
  await signInAndGetUser()
  const token = await getToken()
  const profile = await getUserProfile(token)
  userStore.setProfile(profile)
  userStore.setMicrosoftConnected(true)
}

function handleGoogleFit() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = "http://localhost:5173/google-fit-callback.html";
  const scopes = [
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.sleep.read'
  ].join(' ');
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=token` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&include_granted_scopes=true` +
    `&prompt=select_account consent`;

  window.open(authUrl, 'GoogleFitAuth', 'width=500,height=600');
}

// Pour éviter d'ajouter plusieurs listeners si le composant est recréé
function onGoogleFitMessage(event) {
  if (event.data.type === 'google_fit_token') {
    googleFitAccessToken.value = event.data.accessToken;
    userStore.setGoogleFitConnected(true)
    console.log('Token Google Fit reçu :', googleFitAccessToken.value);
  }
}
onMounted(() => window.addEventListener('message', onGoogleFitMessage));
onUnmounted(() => window.removeEventListener('message', onGoogleFitMessage));
</script>

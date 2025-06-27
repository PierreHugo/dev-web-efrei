<template>
  <div>
    <BaseButton @click="handleSignIn"
      v-if="!user"
      :variant="variant"
      v-bind="$attrs">
      Se connecter avec Microsoft
    </BaseButton>
    <div v-if="user">
      <p>Bienvenue, {{ user.displayName  }}</p>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { signInAndGetUser, getToken, getUserProfile } from "@/lib/microsoftGraph.js";
import { ref } from "vue";

const user = ref(null);

async function handleSignIn() {
  try {
    await signInAndGetUser();
    const token = await getToken();
    const profile = await getUserProfile(token);
    user.value = profile;
  } catch (error) {
    console.error("Login or profile fetch failed", error);
  }
}</script>

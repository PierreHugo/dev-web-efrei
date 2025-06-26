<template>
  <div>
    <BaseButton @click="handleSignIn"
      :variant="variant"
      v-bind="$attrs">
      Se connecter avec Microsoft
    </BaseButton>
    <div v-if="user">
      <p>Bienvenue, {{ user.username }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from '@/components/BaseButton.vue'
import { signInAndGetUser } from "@/lib/microsoftGraph.js";

const user = ref(null);

async function handleSignIn() {
  try {
    user.value = await signInAndGetUser();
  } catch (error) {
    console.error("Login failed", error);
  }
}
</script>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
<template>
  <div>
    <nav style="margin-left: 24px;">
      <div class="left">
        <div v-if="userStore.isMicrosoftConnected">
          Bienvenue, {{ userStore.profile.displayName }}
        </div>
        <div v-if="userStore.isGoogleFitConnected">
          Synchronisé à Google Fit
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HeaderContent",
  components: { }
};
</script>

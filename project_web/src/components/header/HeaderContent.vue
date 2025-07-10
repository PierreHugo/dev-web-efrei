<template>
  <div class="header-content">
    <div class="left">
      <BaseButton variant="on-dark" class="sidebar-toggle" @click="$emit('toggle-sidebar')" aria-label="Ouvrir le menu">
        <span></span><span></span><span></span>
      </BaseButton>
    </div>
    <div class = "right">
      <div v-if="userStore.isGoogleFitConnected" class="synced">
        <strong>Synchronisé à <br />
          Google Fit</strong>
      </div>
      <div v-if="userStore.isMicrosoftConnected">
        <span class="welcome">Bienvenue, <strong>{{ userStore.profile.displayName }}</strong></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import BaseButton from '@/components/BaseButton.vue'
const userStore = useUserStore()
</script>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  margin: 0 32px;
  height: 64px;
  padding: 0;
  gap: 2em;
}
.left{
  display: flex;
  align-items: center;
  margin-left: 24px;
}
.right{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 24px;
}
.sidebar-toggle {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 6px 4px;
}
.sidebar-toggle span {
  display: block;
  width: 24px;
  height: 3px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.2s;
}
.welcome {
  font-size: 1.1em;
  font-weight: 600;
  color: #e0e7ff;
}
.synced {
  color: #a5b4fc;
  font-size: 1em;
  margin-right: 2em;
}
</style>

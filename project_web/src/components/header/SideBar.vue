<template>
  <transition name="slide">
    <nav v-if="isOpen" class="sidebar">
      <button @click="$emit('close')" class="close-btn" aria-label="Fermer le menu">×</button>
      <ul>
        <li><a @click="goToHome">🏠 Accueil</a></li>
        <li><a @click="goToDailyJournal">📝 Journal</a></li>
        <li><a @click="goToGoogleFit">📈 Google Fit</a></li>
      </ul>
    </nav>
  </transition>
</template>

<script setup>
defineProps(['isOpen'])
import router from '@/router/index.js'

const goToHome = () => {
  router.push('/')
}

const goToGoogleFit = () => {
  router.push('/google-fit')
}
const goToDailyJournal = () => {
  router.push('/daily-journal')
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 180px;
  height: 100vh;
  background: linear-gradient(135deg, #2563eb 60%, #1e40af 100%);
  color: #fff;
  padding: 36px 24px 24px 24px;
  box-shadow: 2px 0 16px rgba(30,64,175,0.12);
  z-index: 200;
  display: flex;
  flex-direction: column;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 2em;
  position: absolute;
  top: 18px;
  right: 18px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.close-btn:hover { opacity: 1; }

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 60px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.4em;
}

.sidebar a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2em;
  font-weight: 500;
  padding: 8px 0;
  border-radius: 4px;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.7em;
}
.sidebar a:hover {
  background: rgba(255,255,255,0.08);
  color: #e0e7ff;
  cursor: pointer;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s cubic-bezier(.4,2,.6,1), opacity 0.3s;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(0px); /* Plus doux que -100% */
  opacity: 0;
}
.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>

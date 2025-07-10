<template>
  <header id="header">
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />

    <div class="header-content">
      <HeaderContent @toggle-sidebar="toggleSidebar" />
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/header/SideBar.vue'
import HeaderContent from '@/components/header/HeaderContent.vue'

const sidebarOpen = ref(false)
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

#header {
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  margin: 0;
  padding: 4px 0;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  color: #fff;
  text-align: center;
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.03em;
  box-shadow: 0 2px 16px rgba(30, 64, 175, 0.07);
  border-radius: 0;
  z-index: 100;
}

#header span {
  font-weight: 600;
  opacity: 0.95;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;      /* occupe toute la largeur */
  max-width: none;   /* pas de limite */
  margin: 0;         /* pas de marge latérale */
  padding: 0;
  gap: 2em;
  height: 64px;
}
</style>

<template>
  <header id="header">
    <div class="header-content">
      <header-content />
    </div>
  </header>
</template>

<script>
import HeaderContent from '@/components/header/HeaderContent.vue'
export default {
  name: "BaseHeader",
  components: { HeaderContent }
};
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
  justify-content: space-between; /* Espace entre gauche et droite */
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 32px;
  height: 64px; /* ou selon ton design */
  padding: 0;
}

.left, .center, .right {
  display: flex;
  align-items: center;
}

.center {
  flex: 1;
  justify-content: center;
}

.left {
  justify-content: flex-start;
}

.right {
  justify-content: flex-end;
  gap: 1.2em;
}
</style>

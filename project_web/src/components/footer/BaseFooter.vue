<template>
  <footer id="footer">
    <footer-content />
  </footer>
</template>

<script>
import FooterContent from '@/components/footer/FooterContent.vue'
export default {
  name: "BaseFooter",
  components: { FooterContent }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

#footer {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  color: #fff;
  text-align: center;
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  letter-spacing: 0.03em;
  box-shadow: 0 -2px 16px rgba(30, 64, 175, 0.07);
  /* Suppression des coins arrondis */
  border-radius: 0;
  margin: 0;
  z-index: 100;
}

#footer span {
  font-weight: 600;
  opacity: 0.95;
}
</style>

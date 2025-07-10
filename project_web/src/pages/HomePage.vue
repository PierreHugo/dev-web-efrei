<template>
  <div class="home-container">
    <h1>Bienvenue</h1>

    <div class="home-section main-presentation">
      <h2>L'application</h2>
      <p>
        Découvrez une plateforme complète pour suivre votre bien-être : sommeil, humeur, activité physique et alimentation, tout en un seul endroit.
      </p>
      <ul>
        <li>Suivi quotidien personnalisé</li>
        <li>Connexion à Google Fit pour récupérer vos données d'activité</li>
        <li>Journal interactif et intuitif</li>
      </ul>
    </div>

    <div class="home-section quick-access">
      <div class="access-block">
        <h3>Mon Journal</h3>
        <p>Accédez à votre journal quotidien pour enregistrer et consulter vos données.</p>
        <BaseButton @click="goToDailyJournal">Ouvrir le journal</BaseButton>
      </div>
      <div class="access-block">
        <h3>Google Fit</h3>
        <p>Synchronisez vos données de santé et d’activité physique en un clic.</p>
        <BaseButton @click="goToGoogleFit">Synchroniser Google Fit</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
.home-container {
  max-width: 900px;
  margin: 30px auto;
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.07);
  font-family: 'Inter', Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #2563eb;
  margin-bottom: 36px;
}

.home-section {
  margin-bottom: 32px;
  padding: 28px 22px;
  border-radius: 8px;
  background: #f6f8fa;
  border: 1px solid #e6e7ee;
}

.main-presentation {
  margin-bottom: 38px;
}

.quick-access {
  display: flex;
  gap: 32px;
  justify-content: space-between;
}

.access-block {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(37,99,235,0.04);
  padding: 20px 18px;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.access-block h3 {
  color: #1e40af;
  margin-bottom: 10px;
}

.access-block p {
  margin-bottom: 18px;
}

@media (max-width: 800px) {
  .quick-access {
    flex-direction: column;
    gap: 20px;
  }
}
</style>

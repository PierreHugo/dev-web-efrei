<script setup>
import { ref, onMounted } from 'vue'
import { GoogleFitService } from '@/lib/GoogleFitService.js'

import StepGraph from '@/components/Graphes/StepGraph.vue'
import SleepMoodGraph from '@/components/Graphes/SleepMoodGraph.vue'
import ActivityMoodScatter from '@/components/Graphes/ActivityMoodScatter.vue'
import SleepJournal from '@/components/journal/SleepJournal.vue'
import BaseButton from '@/components/BaseButton.vue'

const service = new GoogleFitService()

// Humeur temporaire en attendant l'intégration réelle du journal
const moodByDate = {
  '07/06/2025': 4,
  '07/07/2025': 3,
  '07/08/2025': 5,
}

const steps = ref([])
const sleepMood = ref([])
const activityMood = ref([])
const sleepStart = ref('')
const sleepEnd = ref('')
const sleepDuration = ref(0)

async function fetchAllData() {
  steps.value = await service.getStepsByDay()
  sleepMood.value = await service.getSleepAndMood(moodByDate)
  activityMood.value = await service.getStepsAndMood(moodByDate)

  // Récupère aussi les infos pour SleepJournal
  const sleepData = await service.getSleepPerDay()
  const today = sleepData.at(-1)
  if (today) {
    sleepDuration.value = today.sleepHours
    sleepStart.value = '--:--' // facultatif : extraire plus précisément le start si nécessaire
    sleepEnd.value = '--:--'
  }
}

onMounted(() => {
  fetchAllData()
})
</script>

<template>
  <div class="google-fit-page">

    <BaseButton @click="fetchAllData">Récupérer les données Google Fit</BaseButton>

    <h2>Pas par jour</h2>
    <StepGraph v-if="steps.length" :stepsData="steps" />

    <h2>Sommeil / humeur</h2>
    <SleepMoodGraph :data="sleepMood" />

    <h2>Activité / humeur</h2>
    <ActivityMoodScatter :data="activityMood" />

    <h2>Données Sommeil :</h2>
    <div v-if="sleepDuration">
      <SleepJournal
        :sleepStart="sleepStart"
        :sleepEnd="sleepEnd"
        :sleepDuration="sleepDuration"
      />
    </div>
    <div v-else>
      <p>Aucune information disponible pour le sommeil.</p>
    </div>
  </div>
</template>

<style scoped>
.google-fit-page {
  padding: 1rem;
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  font-size: 1.08rem;
  color: #23272f;
  background: #f8fafc;
  line-height: 1.7;
  letter-spacing: 0.01em;
}
</style>

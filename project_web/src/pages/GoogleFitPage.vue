<script setup>
import { ref, onMounted } from 'vue'
import { GoogleFitService } from '@/lib/GoogleFitService.js'

import StepGraph from '@/components/Graphes/StepGraph.vue'
import SleepMoodGraph from '@/components/Graphes/SleepMoodGraph.vue'
import ActivityMoodScatter from '@/components/Graphes/ActivityMoodScatter.vue'

// Exemple de données humeur (à remplacer par ton vrai journal)
const moodByDate = {
  '07/06/2025': 4,
  '07/07/2025': 3,
  '07/08/2025': 5,
}

const steps = ref([])
const sleepMood = ref([])
const activityMood = ref([])

const service = new GoogleFitService()

onMounted(async () => {
  steps.value = await service.getStepsByDay()
  sleepMood.value = await service.getSleepAndMood(moodByDate)
  activityMood.value = await service.getStepsAndMood(moodByDate)
})
</script>

<template>
  <div class="google-fit-page">
    <div>
      <h2>Pas par jour</h2>
      <StepGraph v-if="steps.length" :stepsData="steps" />
      <h2>Sommeil / humeur</h2>
      <SleepMoodGraph :data="sleepMood" />

      <h2>Activité / humeur</h2>
      <ActivityMoodScatter :data="activityMood" />
    </div>

    <div>
      <h2>Données Sommeil :</h2>
      <div v-if="sleepStart || sleepEnd || sleepDuration">
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

  </div>
</template>

<style scoped>
.google-fit-page {
  max-height: 90%;
  padding: 1rem;

}
</style>

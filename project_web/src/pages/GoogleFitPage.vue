<script setup>
import { ref, computed, onMounted } from 'vue'
import { GoogleFitService } from '@/lib/GoogleFitService.js'

import StepGraph from '@/components/Graphes/StepGraph.vue'
import SleepMoodGraph from '@/components/Graphes/SleepMoodGraph.vue'
import ActivityMoodScatter from '@/components/Graphes/ActivityMoodScatter.vue'
import SleepJournal from '@/components/journal/SleepJournal.vue'

const moodByDay = ref([
  { date: '10/07/2025', mood: 4 },
  { date: '09/07/2025', mood: 3 },
  { date: '08/07/2025', mood: 5 },
])

const moodDataMap = computed(() => {
  const map = {}
  moodByDay.value.forEach(entry => {
    map[entry.date] = entry.mood
  })
  return map
})

const steps = ref([])
const sleepMood = ref([])
const activityMood = ref([])
const googleFitService = new GoogleFitService()

const service = new GoogleFitService()

onMounted(async () => {
  steps.value = await service.getStepsByDay()
  sleepMood.value = await googleFitService.getSleepAndMood(moodDataMap.value)
  activityMood.value = await googleFitService.getStepsAndMood(moodDataMap.value)
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

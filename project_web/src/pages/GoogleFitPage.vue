<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import SleepJournal from '@/components/journal/SleepJournal.vue'
import BaseButton from '@/components/BaseButton.vue'

const userStore = useUserStore()

const data = ref(null)           // données pas
const sleepStart = ref('')
const sleepEnd = ref('')
const sleepDuration = ref(0)
const stepsByDay = ref([])

async function fetchGoogleFitData() {
  const accessToken = userStore.googleFitAccessToken
  if (!accessToken) {
    console.error('Aucun token Google Fit trouvé !')
    return
  }

  const url = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate'
  const body = {
    aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }],
    bucketByTime: { durationMillis: 86400000 },
    startTimeMillis: Date.now() - 7 * 24 * 60 * 60 * 1000,
    endTimeMillis: Date.now(),
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`)
    }

    const json = await response.json()
    data.value = json
    stepsByDay.value = extractSteps(json)
  } catch (err) {
    console.error('Erreur récupération pas :', err)
  }
}

async function fetchSleepData() {
  const accessToken = userStore.googleFitAccessToken
  if (!accessToken) {
    console.error('Aucun token Google Fit sommeil')
    return
  }

  const url = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate'
  const body = {
    aggregateBy: [{ dataTypeName: 'com.google.sleep.segment' }],
    bucketByTime: { durationMillis: 86400000 },
    startTimeMillis: Date.now() - 7 * 24 * 60 * 60 * 1000,
    endTimeMillis: Date.now(),
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP sommeil : ${response.status}`)
    }

    const json = await response.json()
    const todayBucket = json.bucket.at(-1)
    if (!todayBucket || todayBucket.dataset.length === 0) return

    const points = todayBucket.dataset[0].point
    const sleepSegments = points.filter(p => [2, 3, 4].includes(p.value[0].intVal))

    if (sleepSegments.length === 0) return

    const first = sleepSegments[0]
    const last = sleepSegments.at(-1)

    const startDate = new Date(parseInt(first.startTimeNanos) / 1e6)
    const endDate = new Date(parseInt(last.endTimeNanos) / 1e6)

    sleepStart.value = startDate.toTimeString().slice(0, 5)
    sleepEnd.value = endDate.toTimeString().slice(0, 5)
    sleepDuration.value = Math.round((endDate - startDate) / 360000) / 10
  } catch (err) {
    console.error('Erreur récupération sommeil :', err)
  }
}

function extractSteps(data) {
  if (!data.bucket) return []

  return data.bucket.map(bucket => {
    let steps = 0
    bucket.dataset.forEach(dataset => {
      dataset.point.forEach(point => {
        if (point.value && point.value.length > 0) {
          steps += point.value[0].intVal || 0
        }
      })
    })

    return {
      date: new Date(parseInt(bucket.startTimeMillis)).toLocaleDateString(),
      steps,
    }
  })
}


function fetchAllData() {
  fetchGoogleFitData()
  fetchSleepData()
}
</script>

<template>
  <div>
    <h1>Données Google Fit :</h1>
    <BaseButton @click="fetchAllData">
      Récupérer les données Google Fit
    </BaseButton>

    <!-- Bloc pour les données de pas (ton code actuel) -->
    <div v-if="stepsByDay.length > 0">
      <h2>Pas sur la dernière semaine :</h2>
      <ul>
        <li v-for="(day, index) in stepsByDay" :key="index">
          {{ day.date }} : {{ day.steps }} pas
        </li>
      </ul>
    </div>

    <!-- Bloc séparé pour les données sommeil -->
    <div>
      <h2>Données Sommeil :</h2>
      <template v-if="sleepStart || sleepEnd || sleepDuration">
        <SleepJournal
          :sleepStart="sleepStart"
          :sleepEnd="sleepEnd"
          :sleepDuration="sleepDuration"
        />
      </template>
      <template v-else>
        <p>Aucune information disponible pour le sommeil.</p>
      </template>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
div {
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  font-size: 1.08rem;
  color: #23272f;
  background: #f8fafc;
  line-height: 1.7;
  letter-spacing: 0.01em;
  margin: 0;
  padding: 0;
}

</style>

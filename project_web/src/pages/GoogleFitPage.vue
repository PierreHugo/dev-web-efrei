<script setup>
import { useUserStore } from '@/stores/user.js'
import { ref } from 'vue'

const userStore = useUserStore()
const data = ref(null)

async function fetchGoogleFitData() {
  const accessToken = userStore.googleFitAccessToken
  if (!accessToken) {
    console.error('Aucun token Google Fit trouvé !', accessToken)
    return
  }

  const url = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate'
  const body = {
    aggregateBy: [
      { dataTypeName: 'com.google.step_count.delta' },
    ],
    bucketByTime: { durationMillis: 86400000 },
    startTimeMillis: Date.now() - 7 * 24 * 60 * 60 * 1000,
    endTimeMillis: Date.now(),
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status} ${response.statusText}`)
    }

    data.value = await response.json()
    console.log("Données reçues :", data.value)
  } catch (error) {
    console.error('Erreur avec Google Fit :', error)
  }
}
</script>

<template>
  <div>
    <h1>Données Google Fit :</h1>
    <button @click="fetchGoogleFitData">Récupérer les données Google Fit</button>

    <div v-if="data && data.bucket">
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

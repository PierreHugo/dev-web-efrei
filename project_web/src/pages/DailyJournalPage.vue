<template>
  <div class="daily-journal-container">
    <h1>Mon Journal Quotidien</h1>

    <div class="journal-section">
      <h2>Sommeil</h2>
      <template v-if="sleepStart || sleepEnd || sleepDuration">
        <SleepJournal
          :sleepStart="sleepStart"
          :sleepEnd="sleepEnd"
          :sleepDuration="sleepDuration"
        />
        <p>Qualité du sommeil : {{ sleepQuality || 'Non renseignée' }}</p>
      </template>
      <template v-else>
        <p>Aucune donnée de sommeil disponible pour aujourd'hui.</p>
      </template>
    </div>

    <div class="journal-section">
      <h2>Humeur</h2>
      <p>Humeur du jour : {{ mood || 'Non renseignée' }}</p>
      <BaseButton @click="showMoodInput = true">Enregistrer mon humeur</BaseButton>
      <div v-if="showMoodInput" class="input-form">
        <input type="text" v-model="newMood" placeholder="Comment vous sentez-vous ?" />
        <BaseButton @click="saveMood">Valider</BaseButton>
        <BaseButton variant="on-dark" @click="showMoodInput = false">Annuler</BaseButton>
      </div>
    </div>

    <div class="journal-section">
      <h2>Activité Physique</h2>
      <template v-if="dailyActivity.length > 0">
        <div v-for="(activity, index) in dailyActivity" :key="index">
          <p>Type : <strong>{{ activity.type }}</strong>, Durée : <strong>{{ activity.duration }} minutes</strong></p>
          <p v-if="activity.steps">Pas : <strong>{{ activity.steps }}</strong></p>
        </div>
      </template>
      <template v-else>
        <p>Aucune activité enregistrée pour aujourd'hui.</p>
      </template>
      <BaseButton @click="showActivityInput = true">Ajouter une activité</BaseButton>
      <div v-if="showActivityInput" class="input-form">
        <input type="text" v-model="newActivityType" placeholder="Type d'activité (ex: marche, course)" />
        <input type="number" v-model="newActivityDuration" placeholder="Durée en minutes" />
        <BaseButton @click="saveActivity">Valider</BaseButton>
        <BaseButton variant="on-dark" @click="showActivityInput = false">Annuler</BaseButton>
      </div>
    </div>

    <div class="journal-section">
      <h2>Alimentation</h2>
      <template v-if="dailyFood.length > 0">
        <div v-for="(food, index) in dailyFood" :key="index">
          <p>Repas : <strong>{{ food.description }}</strong></p>
          </div>
      </template>
      <template v-else>
        <p>Aucune donnée alimentaire enregistrée pour aujourd'hui.</p>
      </template>
      <BaseButton @click="showFoodInput = true">Enregistrer un repas</BaseButton>
      <div v-if="showFoodInput" class="input-form">
        <textarea v-model="newFoodDescription" placeholder="Décrivez votre repas"></textarea>
        <BaseButton @click="saveFood">Valider</BaseButton>
        <BaseButton variant="on-dark" @click="showFoodInput = false">Annuler</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user.js';
import SleepJournal from '@/components/journal/SleepJournal.vue';
import BaseButton from '@/components/BaseButton.vue'; // Assuming you'll reuse BaseButton

const userStore = useUserStore();

// Sleep Data
const sleepStart = ref('');
const sleepEnd = ref('');
const sleepDuration = ref(0);
const sleepQuality = ref(''); // New state for sleep quality

// Mood Data
const mood = ref('');
const showMoodInput = ref(false);
const newMood = ref('');

// Activity Data
const dailyActivity = ref([]);
const showActivityInput = ref(false);
const newActivityType = ref('');
const newActivityDuration = ref(null);

// Food Data
const dailyFood = ref([]);
const showFoodInput = ref(false);
const newFoodDescription = ref('');

// Function to fetch sleep data (adapted from GoogleFitPage.vue)
async function fetchSleepData() {
  const accessToken = userStore.googleFitAccessToken;
  if (!accessToken) {
    console.error('Aucun token Google Fit sommeil');
    return;
  }

  const url = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';
  const body = {
    aggregateBy: [{ dataTypeName: 'com.google.sleep.segment' }],
    bucketByTime: { durationMillis: 86400000 }, // Daily aggregation
    startTimeMillis: Date.now() - 24 * 60 * 60 * 1000, // Last 24 hours for daily journal
    endTimeMillis: Date.now(),
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP sommeil : ${response.status}`);
    }

    const json = await response.json();
    const todayBucket = json.bucket.at(-1);

    if (!todayBucket || todayBucket.dataset.length === 0) return;

    const points = todayBucket.dataset[0].point;
    const sleepSegments = points.filter(p => [2, 3, 4].includes(p.value[0].intVal)); // Assuming 2,3,4 are sleep states

    if (sleepSegments.length === 0) return;

    const first = sleepSegments[0];
    const last = sleepSegments.at(-1);

    const startDate = new Date(parseInt(first.startTimeNanos) / 1e6);
    const endDate = new Date(parseInt(last.endTimeNanos) / 1e6);

    sleepStart.value = startDate.toTimeString().slice(0, 5);
    sleepEnd.value = endDate.toTimeString().slice(0, 5);
    sleepDuration.value = Math.round((endDate - startDate) / 360000) / 10;

    // Determine sleep quality (this is a simplified example, you'd need a more robust logic)
    if (sleepDuration.value >= 7 && sleepDuration.value <= 9) {
      sleepQuality.value = 'Bonne';
    } else if (sleepDuration.value > 0) {
      sleepQuality.value = 'Moyenne';
    } else {
      sleepQuality.value = 'Non renseignée';
    }

  } catch (err) {
    console.error('Erreur récupération sommeil :', err);
  }
}

// Function to fetch activity data (adapted from GoogleFitPage.vue, focusing on daily)
async function fetchActivityData() {
  const accessToken = userStore.googleFitAccessToken;
  if (!accessToken) {
    console.error('Aucun token Google Fit trouvé !');
    return;
  }

  const url = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';
  const body = {
    aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }],
    bucketByTime: { durationMillis: 86400000 }, // Daily aggregation
    startTimeMillis: Date.now() - 24 * 60 * 60 * 1000, // Last 24 hours
    endTimeMillis: Date.now(),
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const json = await response.json();
    const todayBucket = json.bucket.at(-1);

    if (todayBucket && todayBucket.dataset.length > 0) {
      let steps = 0;
      todayBucket.dataset.forEach(dataset => {
        dataset.point.forEach(point => {
          if (point.value && point.value.length > 0) {
            steps += point.value[0].intVal || 0;
          }
        });
      });
      // For simplicity, we'll just add steps as a 'Walk' activity. You could expand this for more activity types.
      if (steps > 0) {
        dailyActivity.value.push({ type: 'Marche', duration: 'N/A', steps: steps });
      }
    }
  } catch (err) {
    console.error('Erreur récupération pas :', err);
  }
}


// Functions for Mood (using localStorage for persistence)
function saveMood() {
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem(`mood_${today}`, newMood.value);
  mood.value = newMood.value;
  showMoodInput.value = false;
  newMood.value = '';
}

function loadMood() {
  const today = new Date().toISOString().slice(0, 10);
  mood.value = localStorage.getItem(`mood_${today}`) || '';
}

// Functions for Activity (manual input, using localStorage for persistence)
function saveActivity() {
  if (newActivityType.value && newActivityDuration.value) {
    const today = new Date().toISOString().slice(0, 10);
    const storedActivities = JSON.parse(localStorage.getItem(`activities_${today}`)) || [];
    storedActivities.push({
      type: newActivityType.value,
      duration: newActivityDuration.value,
      timestamp: Date.now()
    });
    localStorage.setItem(`activities_${today}`, JSON.stringify(storedActivities));
    dailyActivity.value = storedActivities; // Update reactive list
    showActivityInput.value = false;
    newActivityType.value = '';
    newActivityDuration.value = null;
  }
}

function loadActivities() {
  const today = new Date().toISOString().slice(0, 10);
  dailyActivity.value = JSON.parse(localStorage.getItem(`activities_${today}`)) || [];
}

// Functions for Food (manual input, using localStorage for persistence)
function saveFood() {
  if (newFoodDescription.value) {
    const today = new Date().toISOString().slice(0, 10);
    const storedFood = JSON.parse(localStorage.getItem(`food_${today}`)) || [];
    storedFood.push({
      description: newFoodDescription.value,
      timestamp: Date.now()
    });
    localStorage.setItem(`food_${today}`, JSON.stringify(storedFood));
    dailyFood.value = storedFood; // Update reactive list
    showFoodInput.value = false;
    newFoodDescription.value = '';
  }
}

function loadFood() {
  const today = new Date().toISOString().slice(0, 10);
  dailyFood.value = JSON.parse(localStorage.getItem(`food_${today}`)) || [];
}


// On component mount, fetch all data
onMounted(() => {
  fetchSleepData();
  fetchActivityData();
  loadMood();
  loadActivities();
  loadFood();
});
</script>

<style scoped>
.daily-journal-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

h1 {
  text-align: center;
  color: #2563eb;
  margin-bottom: 30px;
}

.journal-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: #f9f9f9;
}

h2 {
  color: #1e40af;
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

p {
  margin-bottom: 8px;
  color: #333;
}

strong {
  color: #000;
}

.input-form {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #ccc;
}

.input-form input,
.input-form textarea {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.input-form .base-button {
  margin-right: 10px;
}
</style>
<!-- src/components/ActivityMoodScatter.vue -->
<script setup>
import { Scatter } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
} from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale)

const props = defineProps({
  data: {
    type: Array,
    required: true, // [{ steps, mood }]
  },
})

const chartData = computed(() => ({
  datasets: [
    {
      label: 'Activité vs Humeur',
      data: props.data.map(entry => ({
        x: entry.steps,
        y: entry.mood,
      })),
      backgroundColor: '#FF7043',
    },
  ],
}))

const chartOptions = {
  responsive: true,
  scales: {
    x: {
      title: { display: true, text: 'Pas quotidiens' },
    },
    y: {
      title: { display: true, text: 'Humeur (/5)' },
      min: 1,
      max: 5,
    },
  },
}
</script>

<template>
  <div style="height: 300px;">
    <Scatter :data="chartData" :options="chartOptions" />
  </div>
</template>

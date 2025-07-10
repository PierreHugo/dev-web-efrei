<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const props = defineProps({
  stepsData: {
    type: Array,
    required: true,
  },
})

const chartData = computed(() => ({
  labels: props.stepsData.map(entry => entry.date),
  datasets: [
    {
      label: 'Nombre de pas',
      data: props.stepsData.map(entry => entry.steps),
      borderColor: '#2358d9',
      backgroundColor: 'rgba(32 , 88, 217, 0.2)',
      tension: 0.4,
      fill: true,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Pas journaliers sur la semaine',
    },
  },
}
</script>

<template>
  <div style="height: 300px;">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

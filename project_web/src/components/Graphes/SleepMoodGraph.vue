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
  data: {
    type: Array,
    required: true, // [{ date, sleepHours, mood }]
  },
})

const chartData = computed(() => ({
  labels: props.data.map(d => d.date),
  datasets: [
    {
      label: 'Sommeil (h)',
      data: props.data.map(d => d.sleepHours),
      borderColor: '#42A5F5',
      backgroundColor: '#42A5F533',
      yAxisID: 'y1',
      tension: 0.4,
    },
    {
      label: 'Humeur (/5)',
      data: props.data.map(d => d.mood),
      borderColor: '#66BB6A',
      backgroundColor: '#66BB6A33',
      yAxisID: 'y2',
      tension: 0.4,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  scales: {
    y1: {
      type: 'linear',
      position: 'left',
      title: { display: true, text: 'Sommeil (h)' },
    },
    y2: {
      type: 'linear',
      position: 'right',
      title: { display: true, text: 'Humeur' },
      min: 1,
      max: 5,
      grid: { drawOnChartArea: false },
    },
  },
}
</script>

<template>
  <div style="height: 300px;">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

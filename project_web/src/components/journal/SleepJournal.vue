<script setup>
defineProps({
  sleepStart: String,
  sleepEnd: String,
  sleepDuration: Number,
})
</script>

<template>
  <div>
    <p>Heure de coucher : <strong>{{ sleepStart || 'Non renseignée' }}</strong></p>
    <p>Heure de réveil : <strong>{{ sleepEnd || 'Non renseignée' }}</strong></p>
    <p>Durée de sommeil : <strong>{{ sleepDuration || 0 }} h</strong></p>
  </div>
</template>

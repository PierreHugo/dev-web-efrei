import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const profile = ref(null)
  const isMicrosoftConnected = ref(false)
  const isGoogleFitConnected = ref(false)

  function setProfile(data) {
    profile.value = data
  }
  function setMicrosoftConnected(val) {
    isMicrosoftConnected.value = val
  }
  function setGoogleFitConnected(val) {
    isGoogleFitConnected.value = val
  }

  return { profile, isMicrosoftConnected, isGoogleFitConnected, setProfile, setMicrosoftConnected, setGoogleFitConnected }
})

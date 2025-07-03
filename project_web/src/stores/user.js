import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const profile = ref(null)
  const isMicrosoftConnected = ref(false)
  const isGoogleFitConnected = ref(false)
  const googleFitAccessToken = ref(null)

  function setProfile(data) {
    profile.value = data
  }
  function setMicrosoftConnected(val) {
    isMicrosoftConnected.value = val
  }
  function setGoogleFitConnected(val) {
    isGoogleFitConnected.value = val
  }
  function setGoogleFitAccessToken(token) {
    googleFitAccessToken.value = token
  }

  return {
    profile,
    isMicrosoftConnected,
    isGoogleFitConnected,
    googleFitAccessToken,
    setProfile,
    setMicrosoftConnected,
    setGoogleFitConnected,
    setGoogleFitAccessToken
  }
})

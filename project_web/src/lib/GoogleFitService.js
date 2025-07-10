import { useUserStore } from '@/stores/user.js'

export class GoogleFitService {
  constructor() {
    this.accessToken = useUserStore().googleFitAccessToken
    this.baseUrl = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate'
    this.startTime = Date.now() - 7 * 24 * 60 * 60 * 1000 // 7 jours
    this.endTime = Date.now()
  }

  async fetchData(dataTypeName) {
    if (!this.accessToken) throw new Error('Aucun token Google Fit')

    const body = {
      aggregateBy: [{ dataTypeName }],
      bucketByTime: { durationMillis: 86400000 },
      startTimeMillis: this.startTime,
      endTimeMillis: this.endTime,
    }

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`)

    return await response.json()
  }

  async getStepsByDay() {
    const raw = await this.fetchData('com.google.step_count.delta')
    return raw.bucket.map(bucket => {
      let steps = 0
      bucket.dataset.forEach(dataset => {
        dataset.point.forEach(point => {
          steps += point.value?.[0]?.intVal || 0
        })
      })
      return {
        date: new Date(parseInt(bucket.startTimeMillis)).toLocaleDateString(),
        steps,
      }
    })
  }

  async getSleepPerDay() {
    const raw = await this.fetchData('com.google.sleep.segment')
    return raw.bucket.map(bucket => {
      const points = bucket.dataset?.[0]?.point || []
      const segments = points.filter(p => [2, 3, 4].includes(p.value?.[0]?.intVal))

      if (segments.length === 0) return null

      const first = segments[0]
      const last = segments.at(-1)

      const start = new Date(parseInt(first.startTimeNanos) / 1e6)
      const end = new Date(parseInt(last.endTimeNanos) / 1e6)
      const sleepHours = (end - start) / 3600000

      return {
        date: start.toLocaleDateString(),
        sleepHours: Math.round(sleepHours * 10) / 10,
      }
    }).filter(Boolean)
  }

  async getSleepAndMood(moodDataByDate = {}) {
    const sleep = await this.getSleepPerDay()
    return sleep.map(entry => ({
      ...entry,
      mood: moodDataByDate[entry.date] || null,
    }))
  }

  async getStepsAndMood(moodDataByDate = {}) {
    const steps = await this.getStepsByDay()
    return steps.map(entry => ({
      ...entry,
      mood: moodDataByDate[entry.date] || null,
    }))
  }
}

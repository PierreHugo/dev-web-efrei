import { createRouter, createWebHistory } from 'vue-router'
  import HomePage from '@/pages/HomePage.vue'
  import GoogleFitPage from '@/pages/GoogleFitPage.vue'
  import LoginPage from '@/pages/LoginPage.vue'
  import DailyJournalPage from '@/pages/DailyJournalPage.vue'

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomePage,
      },
      {
        path: '/login',
        name: 'login',
        component: LoginPage,
      },
      {
        path: '/google-fit',
        name: 'google-fit',
        component: GoogleFitPage,
      },
      {
        path: '/daily-journal',
        name: 'daily-journal',
        component: DailyJournalPage,
      },
    ],
  })

  export default router

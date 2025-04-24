import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('../views/Tasks.vue')
  },
  {
    path: '/literature',
    name: 'Literature',
    component: () => import('../views/Literature.vue')
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import('../views/Data.vue')
  },
  {
    path: '/letters',
    name: 'Letters',
    component: () => import('../views/Letters.vue')
  },
  {
    path: '/workflow',
    name: 'Workflow',
    component: () => import('../views/Workflow.vue')
  },
  {
    path: '/code-links',
    name: 'CodeLinks',
    component: () => import('../views/CodeLinks.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/down-syndrome-terms',
    name: 'DownSyndromeTerms',
    component: () => import('../views/DownSyndromeTerms.vue')
  },
  {
    path: '/speech-analysis',
    name: 'SpeechAnalysis',
    component: () => import('../views/SpeechAnalysis.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ApiBasics from '../views/ApiBasics.vue'
import HttpAndWeb from '../views/HttpAndWeb.vue'
import Authentication from '../views/Authentication.vue'
import Playground from '../views/Playground.vue'
import ApiCreator from '../views/ApiCreator.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/basics',
      name: 'basics',
      component: ApiBasics
    },
    {
      path: '/http-web',
      name: 'http-web',
      component: HttpAndWeb
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: Authentication
    },
    {
      path: '/playground',
      name: 'playground',
      component: Playground
    },
    {
      path: '/create-api',
      name: 'create-api',
      component: ApiCreator
    }
  ]
})

export default router
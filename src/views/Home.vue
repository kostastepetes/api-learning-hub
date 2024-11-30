<script setup lang="ts">
import { RouterLink } from 'vue-router'

const sections = [
  {
    title: 'API Basics',
    description: 'Learn about APIs, their types, and fundamental concepts.',
    path: '/basics'
  },
  {
    title: 'HTTP & Web APIs',
    description: 'Explore HTTP methods, headers, and web API concepts.',
    path: '/http-web'
  },
  {
    title: 'Authentication',
    description: 'Understand different authentication mechanisms for APIs.',
    path: '/authentication'
  },
  {
    title: 'Interactive Playground',
    description: 'Practice API calls and see responses in real-time.',
    path: '/playground'
  },
  {
    title: 'Create Your API',
    description: 'Build and test your own REST API with a visual interface.',
    path: '/create-api'
  }
]
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
        Learn Modern APIs
      </h1>
      <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Master the fundamentals of APIs, from basic concepts to advanced implementations.
        Interactive lessons and hands-on practice included.
      </p>
    </div>

    <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="section in sections"
        :key="section.title"
        :to="section.path"
        class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div>
          <h3 class="text-lg font-medium text-gray-900">
            {{ section.title }}
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            {{ section.description }}
          </p>
        </div>
        <span
          class="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
          aria-hidden="true"
        >
          →
        </span>
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ title }}</h2>
    <p v-if="description" class="text-gray-600 mb-6">{{ description }}</p>
    <slot></slot>
  </section>
</template>
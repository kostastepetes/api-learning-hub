<script setup lang="ts">
import { onMounted } from 'vue'
import Prism from 'prismjs'

defineProps<{
  code: string
  language?: string
}>()

onMounted(() => {
  Prism.highlightAll()
})
</script>

<template>
  <pre class="rounded-lg"><code :class="`language-${language || 'javascript'}`">{{ code }}</code></pre>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'
import Prism from 'prismjs'

const endpoint = ref('https://jsonplaceholder.typicode.com/posts/1')
const method = ref('GET')
const headers = reactive({})
const requestBody = ref('')
const response = ref('')
const loading = ref(false)

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

async function sendRequest() {
  loading.value = true
  try {
    const config = {
      method: method.value,
      url: endpoint.value,
      headers,
      data: requestBody.value ? JSON.parse(requestBody.value) : undefined
    }
    
    const result = await axios(config)
    response.value = JSON.stringify(result.data, null, 2)
  } catch (error) {
    if (error instanceof Error) {
      response.value = `Error: ${error.message}`
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 mb-8">API Playground</h2>
    
    <div class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Endpoint</label>
        <input
          v-model="endpoint"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Method</label>
        <select
          v-model="method"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option v-for="m in methods" :key="m" :value="m">{{ m }}</option>
        </select>
      </div>

      <div v-if="method !== 'GET'">
        <label class="block text-sm font-medium text-gray-700">Request Body</label>
        <textarea
          v-model="requestBody"
          rows="4"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>

      <button
        @click="sendRequest"
        :disabled="loading"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ loading ? 'Sending...' : 'Send Request' }}
      </button>

      <div v-if="response">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Response</h3>
        <pre><code class="language-json">{{ response }}</code></pre>
      </div>
    </div>
  </div>
</template>
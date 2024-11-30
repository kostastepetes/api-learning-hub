<script setup lang="ts">
import { ref, reactive } from 'vue'
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import ContentSection from '../components/ContentSection.vue'
import CodeExample from '../components/CodeExample.vue'

interface Resource {
  name: string
  fields: { name: string; type: string }[]
}

const resources = reactive<Resource[]>([])
const newResource = reactive<Resource>({
  name: '',
  fields: []
})

const fieldTypes = ['string', 'number', 'boolean', 'array', 'object']

function addField() {
  newResource.fields.push({ name: '', type: 'string' })
}

function removeField(index: number) {
  newResource.fields.splice(index, 1)
}

function addResource() {
  if (newResource.name && newResource.fields.length > 0) {
    resources.push({
      name: newResource.name,
      fields: [...newResource.fields]
    })
    newResource.name = ''
    newResource.fields = []
  }
}

function generateJsonServer() {
  const db: Record<string, any[]> = {}
  
  resources.forEach(resource => {
    db[resource.name] = [generateSampleData(resource.fields)]
  })
  
  return JSON.stringify(db, null, 2)
}

function generateSampleData(fields: { name: string; type: string }[]) {
  const data: Record<string, any> = { id: 1 }
  
  fields.forEach(field => {
    switch (field.type) {
      case 'string':
        data[field.name] = `Sample ${field.name}`
        break
      case 'number':
        data[field.name] = 42
        break
      case 'boolean':
        data[field.name] = true
        break
      case 'array':
        data[field.name] = ['item1', 'item2']
        break
      case 'object':
        data[field.name] = { key: 'value' }
        break
    }
  })
  
  return data
}

function generateEndpoints() {
  return resources.map(resource => {
    const base = `/api/${resource.name}`
    return `
# ${resource.name} Endpoints

GET ${base}
GET ${base}/:id
POST ${base}
PUT ${base}/:id
PATCH ${base}/:id
DELETE ${base}/:id
`.trim()
  }).join('\n\n')
}

const jsonContent = ref('')
const showInstructions = ref(false)

function generateApi() {
  jsonContent.value = generateJsonServer()
  showInstructions.value = true
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Create Your API</h1>

    <ContentSection title="Define Resources">
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Resource Name</label>
          <input
            v-model="newResource.name"
            type="text"
            placeholder="e.g., posts, users, comments"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Fields</h3>
            <button
              @click="addField"
              class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              <PlusIcon class="h-4 w-4 mr-1" />
              Add Field
            </button>
          </div>

          <div class="space-y-4">
            <div
              v-for="(field, index) in newResource.fields"
              :key="index"
              class="flex items-center space-x-4"
            >
              <input
                v-model="field.name"
                type="text"
                placeholder="Field name"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <select
                v-model="field.type"
                class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option v-for="type in fieldTypes" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
              <button
                @click="removeField(index)"
                class="text-red-600 hover:text-red-700"
              >
                <TrashIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <button
          @click="addResource"
          :disabled="!newResource.name || newResource.fields.length === 0"
          class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
        >
          Add Resource
        </button>
      </div>
    </ContentSection>

    <ContentSection v-if="resources.length > 0" title="Defined Resources">
      <div class="space-y-4">
        <div
          v-for="resource in resources"
          :key="resource.name"
          class="bg-gray-50 p-4 rounded-lg"
        >
          <h3 class="font-semibold text-gray-900 mb-2">{{ resource.name }}</h3>
          <ul class="list-disc list-inside text-gray-700">
            <li v-for="field in resource.fields" :key="field.name">
              {{ field.name }}: {{ field.type }}
            </li>
          </ul>
        </div>
      </div>

      <button
        @click="generateApi"
        class="mt-6 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Generate API
      </button>
    </ContentSection>

    <ContentSection v-if="showInstructions" title="Your API Configuration">
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">1. Create db.json</h3>
          <CodeExample :code="jsonContent" language="json" />
        </div>

        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">2. Available Endpoints</h3>
          <CodeExample :code="generateEndpoints()" />
        </div>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">3. Start the Server</h3>
          <p class="text-gray-700 mb-4">Run the following command to start your API server:</p>
          <CodeExample code="npm run api" />
          <p class="text-gray-700 mt-4">Your API will be available at: http://localhost:3001</p>
        </div>
      </div>
    </ContentSection>
  </div>
</template>
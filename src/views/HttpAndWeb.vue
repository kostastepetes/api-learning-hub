<script setup lang="ts">
import { ref } from 'vue'
import ContentSection from '../components/ContentSection.vue'
import CodeExample from '../components/CodeExample.vue'

const httpMethodsExample = `
// Common HTTP Methods and Their Usage
GET /api/posts     // Retrieve resources
  - Safe and idempotent
  - Cacheable
  - No request body

POST /api/posts    // Create a resource
  - Not idempotent
  - Has request body
  - Returns new resource

PUT /api/posts/1   // Update/Replace a resource
  - Idempotent
  - Requires full resource
  - Has request body

PATCH /api/posts/1 // Partial update
  - Not idempotent
  - Partial resource update
  - Has request body

DELETE /api/posts/1 // Delete a resource
  - Idempotent
  - Usually no request body
`.trim()

const headersExample = `
// Common HTTP Headers Explained
Authorization: Bearer token123
Content-Type: application/json
Accept: application/json
Origin: https://example.com
Cache-Control: no-cache
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
X-Rate-Limit-Limit: 100
X-Rate-Limit-Remaining: 98
`.trim()

const corsExample = `
// CORS Headers
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
`.trim()

const errorHandlingExample = `
// Error Response Example
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      },
      {
        "field": "age",
        "message": "Must be greater than 0"
      }
    ],
    "requestId": "req_123abc",
    "timestamp": "2024-02-20T12:00:00Z"
  }
}
`.trim()

const activeSection = ref('methods')
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">HTTP and Web APIs</h1>

    <div class="mb-8">
      <div class="sm:hidden">
        <select
          v-model="activeSection"
          class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="methods">HTTP Methods</option>
          <option value="headers">Headers</option>
          <option value="status">Status Codes</option>
          <option value="cors">CORS</option>
          <option value="errors">Error Handling</option>
        </select>
      </div>

      <div class="hidden sm:block">
        <nav class="flex space-x-4" aria-label="Tabs">
          <button
            v-for="section in ['methods', 'headers', 'status', 'cors', 'errors']"
            :key="section"
            @click="activeSection = section"
            :class="[
              activeSection === section
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700',
              'px-3 py-2 font-medium text-sm rounded-md'
            ]"
          >
            {{ section.charAt(0).toUpperCase() + section.slice(1) }}
          </button>
        </nav>
      </div>
    </div>

    <div v-show="activeSection === 'methods'">
      <ContentSection 
        title="HTTP Methods"
        description="HTTP defines a set of request methods to indicate the desired action to be performed for a given resource."
      >
        <CodeExample :code="httpMethodsExample" />
      </ContentSection>
    </div>

    <div v-show="activeSection === 'headers'">
      <ContentSection title="HTTP Headers">
        <p class="mb-4 text-gray-700">Headers provide additional information about the request or response, controlling caching, authentication, and more.</p>
        <CodeExample :code="headersExample" />
      </ContentSection>
    </div>

    <div v-show="activeSection === 'status'">
      <ContentSection title="Status Codes">
        <div class="space-y-4">
          <div v-for="(group, index) in [
            { 
              range: '2xx', 
              name: 'Success',
              description: 'The request was successfully received, understood, and accepted',
              examples: [
                '200 OK - Standard success response',
                '201 Created - Resource created successfully',
                '204 No Content - Success with no response body'
              ]
            },
            {
              range: '4xx',
              name: 'Client Errors',
              description: 'The request contains bad syntax or cannot be fulfilled',
              examples: [
                '400 Bad Request - Invalid request format/syntax',
                '401 Unauthorized - Authentication required',
                '403 Forbidden - Authenticated but not authorized',
                '404 Not Found - Resource does not exist',
                '429 Too Many Requests - Rate limit exceeded'
              ]
            },
            {
              range: '5xx',
              name: 'Server Errors',
              description: 'The server failed to fulfill a valid request',
              examples: [
                '500 Internal Server Error - Generic server error',
                '502 Bad Gateway - Invalid response from upstream server',
                '503 Service Unavailable - Server temporarily unavailable'
              ]
            }
          ]" :key="index" class="p-4 bg-gray-50 rounded-lg">
            <h3 class="font-semibold text-gray-900">{{ group.range }} - {{ group.name }}</h3>
            <p class="text-gray-600 mt-1 mb-2">{{ group.description }}</p>
            <ul class="mt-2 space-y-1 text-gray-700">
              <li v-for="example in group.examples" :key="example" class="ml-4">• {{ example }}</li>
            </ul>
          </div>
        </div>
      </ContentSection>
    </div>

    <div v-show="activeSection === 'cors'">
      <ContentSection 
        title="Cross-Origin Resource Sharing (CORS)"
        description="CORS is a security feature that controls how web pages in one domain can request and interact with resources from another domain."
      >
        <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
          <li>Prevents unauthorized cross-origin requests</li>
          <li>Controlled by response headers</li>
          <li>Supports preflight requests for complex operations</li>
          <li>Essential for browser security</li>
        </ul>
        <CodeExample :code="corsExample" />
      </ContentSection>
    </div>

    <div v-show="activeSection === 'errors'">
      <ContentSection 
        title="Error Handling"
        description="Proper error handling is crucial for API usability and debugging."
      >
        <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
          <li>Use appropriate HTTP status codes</li>
          <li>Provide detailed error messages</li>
          <li>Include error codes for programmatic handling</li>
          <li>Add debugging information when appropriate</li>
        </ul>
        <CodeExample :code="errorHandlingExample" />
      </ContentSection>
    </div>
  </div>
</template>
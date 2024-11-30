<script setup lang="ts">
import { ref } from 'vue'
import ContentSection from '../components/ContentSection.vue'
import CodeExample from '../components/CodeExample.vue'

const activeTab = ref('rest')

const restExample = `
// REST API Example
GET /api/users           // Get all users
GET /api/users/123       // Get user with ID 123
POST /api/users          // Create a new user
PUT /api/users/123       // Update user with ID 123
DELETE /api/users/123    // Delete user with ID 123

// Example Response
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-02-20T12:00:00Z"
}
`.trim()

const graphqlExample = `
// GraphQL Query Example
query {
  user(id: "123") {
    id
    name
    email
    posts {
      title
      content
      comments {
        author {
          name
        }
        text
      }
    }
    followers {
      totalCount
      nodes {
        name
        avatar
      }
    }
  }
}

// GraphQL Mutation Example
mutation {
  createPost(input: {
    title: "Hello GraphQL"
    content: "This is my first post"
    tags: ["graphql", "api"]
  }) {
    id
    title
    author {
      name
    }
  }
}
`.trim()

const soapExample = `
<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Header>
    <security>
      <token>abc123</token>
    </security>
  </soap:Header>
  <soap:Body>
    <getUser>
      <id>123</id>
    </getUser>
  </soap:Body>
</soap:Envelope>
`.trim()

const websocketExample = `
// WebSocket Connection
const ws = new WebSocket('wss://api.example.com/websocket');

// Connection opened
ws.addEventListener('open', (event) => {
  ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'notifications'
  }));
});

// Listen for messages
ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
});

// Handle connection close
ws.addEventListener('close', (event) => {
  if (event.wasClean) {
    console.log('Closed cleanly');
  } else {
    console.log('Connection died');
  }
});
`.trim()

const apiDesignPrinciples = [
  {
    title: 'Consistency',
    description: 'Use consistent naming conventions, error handling, and data formats across all endpoints.'
  },
  {
    title: 'Idempotency',
    description: 'Multiple identical requests should have the same effect as a single request.'
  },
  {
    title: 'Statelessness',
    description: 'Each request should contain all information needed to process it, without relying on server state.'
  },
  {
    title: 'Resource-Oriented',
    description: 'Design around resources (nouns) rather than actions (verbs).'
  }
]
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Understanding API Basics</h1>

    <ContentSection 
      title="What is an API?"
      description="An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other."
    >
      <ul class="list-disc list-inside space-y-2 text-gray-700">
        <li>APIs define the methods and data formats applications can use to request and exchange information</li>
        <li>They act as intermediaries between different software systems</li>
        <li>APIs abstract complex operations into simple, reusable interfaces</li>
        <li>Enable modularity and separation of concerns in software architecture</li>
        <li>Facilitate integration between different services and platforms</li>
      </ul>
    </ContentSection>

    <ContentSection title="API Design Principles">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div v-for="principle in apiDesignPrinciples" :key="principle.title" 
          class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold text-gray-900 mb-2">{{ principle.title }}</h3>
          <p class="text-gray-700">{{ principle.description }}</p>
        </div>
      </div>
    </ContentSection>

    <ContentSection title="Types of APIs">
      <div class="mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in ['rest', 'graphql', 'soap', 'websocket']"
              :key="tab"
              @click="activeTab = tab"
              :class="[
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              {{ tab.toUpperCase() }}
            </button>
          </nav>
        </div>

        <div class="mt-6">
          <div v-if="activeTab === 'rest'">
            <h3 class="text-lg font-medium text-gray-900 mb-4">REST (Representational State Transfer)</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Resource-based URLs representing entities</li>
              <li>Uses standard HTTP methods (GET, POST, PUT, DELETE)</li>
              <li>Stateless communication between client and server</li>
              <li>Supports caching for improved performance</li>
              <li>Returns data typically in JSON format</li>
            </ul>
            <CodeExample :code="restExample" />
          </div>

          <div v-if="activeTab === 'graphql'">
            <h3 class="text-lg font-medium text-gray-900 mb-4">GraphQL</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Query language for APIs with type system</li>
              <li>Single endpoint for all data operations</li>
              <li>Clients specify exactly what data they need</li>
              <li>Supports real-time updates with subscriptions</li>
              <li>Powerful developer tools and introspection</li>
            </ul>
            <CodeExample :code="graphqlExample" language="graphql" />
          </div>

          <div v-if="activeTab === 'soap'">
            <h3 class="text-lg font-medium text-gray-900 mb-4">SOAP (Simple Object Access Protocol)</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>XML-based messaging protocol</li>
              <li>Platform and language independent</li>
              <li>Built-in error handling</li>
              <li>Supports complex transactions and enterprise features</li>
              <li>Works with various transport protocols (HTTP, SMTP, etc.)</li>
            </ul>
            <CodeExample :code="soapExample" language="xml" />
          </div>

          <div v-if="activeTab === 'websocket'">
            <h3 class="text-lg font-medium text-gray-900 mb-4">WebSocket</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Full-duplex communication channel</li>
              <li>Real-time data transfer</li>
              <li>Persistent connection</li>
              <li>Lower latency than HTTP polling</li>
              <li>Ideal for chat, gaming, and live updates</li>
            </ul>
            <CodeExample :code="websocketExample" />
          </div>
        </div>
      </div>
    </ContentSection>
  </div>
</template>
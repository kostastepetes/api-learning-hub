<script setup lang="ts">
import ContentSection from '../components/ContentSection.vue'
import CodeExample from '../components/CodeExample.vue'

const apiKeyExample = `
// API Key Authentication
const headers = {
  'X-API-Key': 'your_api_key_here'
};

fetch('https://api.example.com/data', { headers })
`.trim()

const jwtExample = `
// JWT Authentication
const headers = {
  'Authorization': 'Bearer eyJhbGciOiJS...'
};

fetch('https://api.example.com/protected', { headers })
`.trim()

const oauth2Example = `
// OAuth 2.0 Flow
const config = {
  clientId: 'your_client_id',
  redirectUri: 'https://your-app.com/callback',
  scope: 'read write'
};

// 1. Redirect to authorization URL
window.location.href = \`https://oauth-provider.com/auth?
  client_id=\${config.clientId}&
  redirect_uri=\${config.redirectUri}&
  scope=\${config.scope}&
  response_type=code\`;

// 2. Exchange code for token
async function getToken(code) {
  const response = await fetch('https://oauth-provider.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: config.clientId,
      redirect_uri: config.redirectUri
    })
  });
  return response.json();
}
`.trim()
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">API Authentication</h1>

    <ContentSection 
      title="API Keys"
      description="Simple authentication method using a unique key to identify the client."
    >
      <ul class="list-disc list-inside space-y-2 text-gray-700 mb-4">
        <li>Easy to implement</li>
        <li>Suitable for public APIs</li>
        <li>Limited security features</li>
      </ul>
      <CodeExample :code="apiKeyExample" />
    </ContentSection>

    <ContentSection 
      title="JWT (JSON Web Tokens)"
      description="Secure method for transmitting information between parties as a JSON object."
    >
      <ul class="list-disc list-inside space-y-2 text-gray-700 mb-4">
        <li>Stateless authentication</li>
        <li>Can contain user data and permissions</li>
        <li>Cryptographically signed</li>
      </ul>
      <CodeExample :code="jwtExample" />
    </ContentSection>

    <ContentSection 
      title="OAuth 2.0"
      description="Industry-standard protocol for authorization."
    >
      <ul class="list-disc list-inside space-y-2 text-gray-700 mb-4">
        <li>Secure delegation of access</li>
        <li>Multiple grant types</li>
        <li>Used by major API providers</li>
      </ul>
      <CodeExample :code="oauth2Example" />
    </ContentSection>
  </div>
</template>
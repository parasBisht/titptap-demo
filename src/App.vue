<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex flex-col items-center p-4 max-h-screen md:flex-row md:justify-between md:items-center">
    <nav class="flex gap-4 text-sm md:text-base mt-4 md:mt-0">
      <RouterLink to="/" class="px-4 py-2 border-l first:border-0 hover:text-purple-700"
        :class="{ 'text-purple-700 font-bold': $route.path === '/' }">
        Home
      </RouterLink>
      <RouterLink to="/custom-card" class="px-4 py-2 border-l first:border-0 hover:text-purple-700"
        :class="{ 'text-purple-700 font-bold': $route.path === '/custom-card' }">
        Custom Cards
      </RouterLink>
    </nav>
  </header>

  <main class="p-4">
    <RouterView />
  </main>
</template>

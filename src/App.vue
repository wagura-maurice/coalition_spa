// src/App.vue
<template>
  <div class="bg-white">
    <nav class="fixed top-0 left-0 right-0 z-10 border-b border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="@/assets/logo.svg" class="h-8" alt="Coalition Technologies" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Coalition</span>
        </a>
        <button @click="toggleNav" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" :aria-expanded="isNavOpen ? 'true' : 'false'">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div :class="['w-full', 'md:block', 'md:w-auto', {'hidden': !isNavOpen}]" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <RouterLink to="/task/catalog" class="block py-2 px-3 font-extrabold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" :class="{ 'text-blue-700': $route.path === '/task/catalog' }" :aria-current="$route.path === '/task/catalog' ? 'page' : null">TASK CATALOGS</RouterLink>
            </li>
            <li>
              <RouterLink to="/task/category" class="block py-2 px-3 font-extrabold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" :class="{ 'text-blue-700': $route.path === '/task/category' }" :aria-current="$route.path === '/task/category' ? 'page' : null">TASK CATEGORIES</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Content Area -->
    <div class="flex-grow max-w-screen-xl mx-auto p-4">
      <RouterView />
    </div>
    <footer class="border-t border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" class="hover:underline">Coalition Technologies™</a>. All Rights Reserved.</span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">About</a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
          </li>
          <li>
            <a href="#" class="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const isNavOpen = ref(false)

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}
</script>

<style scoped>
.flex-grow {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
  margin-bottom: auto;
}
</style>

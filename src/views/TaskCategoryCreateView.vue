// src/views/TaskCategoryCreateView.vue
<template>
  <div class="max-w-lg mx-auto mt-8">
    <h1 class="self-center text-2xl font-bold mb-4 whitespace-nowrap">Enter Details:</h1>
    <form @submit.prevent="createCategory">
      <div class="mb-6">
        <label for="name" class="block mb-2 text-lg font-bold font-medium text-gray-900">Category Name *</label>
        <input v-model="category.name" type="text" id="name" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter task category name" required>
      </div>

     <div class="mb-6">
        <label for="description" class="block mb-2 text-lg font-bold font-medium text-gray-900">Category Description</label>
        <textarea v-model="category.description" id="description" rows="10" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your task category description here..."></textarea>
      </div>

      <button type="submit" class="block w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-6 py-3.5 text-center me-2 mb-2">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Swal from 'sweetalert2';
import api from '@/api';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

const category = ref({
  name: '',
  description: ''
});

const createCategory = async () => {
  try {
    const response = await api.post('/task/category', category.value);
    // show toast notification based on the server response json object
    Toast.fire({
      icon: response?.data?.throwable?.status,
      title: response?.data?.throwable?.message
    });
    // reset the form if response status is 201
    if (response.status === 201) {
      category.value = { name: '', description: '' };
    }
  } catch (error) {
    console.error('Error creating category:', error);
    // show toast notification based on the error message
    Toast.fire({
        icon: "error",
        title: "Error deleting category: " + error 
      });
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>

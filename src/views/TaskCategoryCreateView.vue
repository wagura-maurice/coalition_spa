// src/views/TaskCategoryCreateView.vue
<template>
  <div class="container mx-auto w-4/5">
    <h1 class="text-2xl font-bold mb-4 whitespace-nowrap">Create Task Category:</h1>
    <p class="mt-1 text-sm leading-6 text-gray-600">Provide details for the new task category item.</p>
    <form @submit.prevent="createCategory" class="w-full">
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="col-span-full">
          <label for="name" class="block mb-2 text-sm font-bold text-gray-600">Category Name <span class="text-red-500">*</span></label>
          <div class="mt-2">
            <input v-model="category.name" type="text" name="name" id="name" autocomplete="off" class="block w-full rounded-md border-0 py-1.5 text-sm font-bold text-pink-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" placeholder="Enter task category name" required>
          </div>
        </div>
        <div class="col-span-full">
          <label for="description" class="block mb-2 text-sm font-bold text-gray-600">Description</label>
          <div class="mt-2">
            <textarea v-model="category.description" id="description" name="description" rows="10" class="block w-full rounded-md border-0 py-1.5 text-sm font-bold text-pink-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" placeholder="Write your task category description here..."></textarea>
          </div>
          <p class="mt-3 text-sm text-gray-600">Provide a brief description of the task item.</p>
        </div>
      </div>
      <div class="mt-6 flex">
        <button type="submit" class="block w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg px-6 py-3.5">Submit</button>
      </div>
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #CBD5E0;
}

button {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #3B82F6;
  border-radius: 0.375rem;
}
</style>
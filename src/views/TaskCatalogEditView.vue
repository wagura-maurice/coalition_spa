src/views/TaskCatalogEditView.vue
<template>
    <div class="container mx-auto w-4/5">
      <h1 class="text-2xl font-bold mb-4 whitespace-nowrap">Update Task Catalog:</h1>
      <p class="mt-1 text-sm text-gray-600">Update the details for the task catalog item.</p>
      
      <form @submit.prevent="updateCatalog" class="w-full">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <!-- Catalog Name -->
          <div class="sm:col-span-4">
            <label for="name" class="block mb-2 text-sm font-bold text-gray-600">Catalog Name <span class="text-red-500">*</span></label>
            <div class="mt-2">
              <input v-model="catalog.title" type="text" name="name" id="name" autocomplete="off" class="block w-full rounded-md border-0 py-1.5 text-sm font-bold text-pink-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" placeholder="Enter task catalog name" required>
            </div>
          </div>
          
          <!-- Task Category -->
          <div class="sm:col-span-2">
            <label for="category" class="block mb-2 text-sm font-bold text-gray-600">Task Category</label>
            <div class="mt-2">
              <select v-model="catalog.category_id" id="category" name="category" class="block w-full rounded-md border-0 py-1.5 text-sm font-bold text-pink-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                <option v-for="category in categories" :key="category.id" :value="category.id" class="text-sm font-bold text-gray-600" :selected="catalog.category_id === category.id">{{ category.name }}</option>
              </select>
            </div>
          </div>
          
          <!-- Description -->
          <div class="col-span-full">
            <label for="description" class="block mb-2 text-sm font-bold text-gray-600">Description</label>
            <div class="mt-2">
              <textarea v-model="catalog.description" id="description" name="description" rows="10" class="block w-full rounded-md border-0 py-1.5 text-sm font-bold text-pink-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" placeholder="Write your task catalog description here..."></textarea>
            </div>
            <p class="mt-3 text-sm text-gray-600">Provide a brief description of the task item.</p>
          </div>
          
          <!-- Priority -->
          <div class="sm:col-span-3">
            <label for="priority" class="block mb-2 text-sm font-bold text-gray-600">Priority</label>
            <div class="mt-2">
              <select v-model="catalog._priority" id="priority" name="priority" class="block w-full rounded-md border-0 py-1.5 text-sm font-bold text-pink-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                <option v-for="priority in priorities" :key="priority.value" :value="priority.value" class="text-sm font-bold text-gray-600" :selected="catalog._priority === priority.value">{{ priority.label }}</option>
              </select>
            </div>
          </div>
          
          <!-- Status -->
          <div class="sm:col-span-3">
            <label for="status" class="block mb-2 text-sm font-bold text-gray-600">Status</label>
            <div class="mt-2">
              <select v-model="catalog._status" id="status" name="status" class="block w-full rounded-md border-0 py-1.5 text-sm font-bold text-pink-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                <option v-for="status in statuses" :key="status.value" :value="status.value" class="text-sm font-bold text-gray-600" :selected="catalog._status === status.value">{{ status.label }}</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Submit Button -->
        <div class="mt-6 flex">
          <button type="submit" class="block w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg px-6 py-3.5">Update Catalog</button>
        </div>
      </form>
    </div>
  </template>
  

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import api from '@/api';

const router = useRouter();
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

const catalogId = router.currentRoute.value.params.id;
const catalog = ref({
  category_id: '',
  title: '',
  description: '',
  _priority: null,
  _status: null
});

const categories = ref([]);
const priorities = [
  { label: 'Urgent', value: 0 },
  { label: 'High', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'Low', value: 3 },
  { label: 'Critical', value: 4 },
  { label: 'Normal', value: 5 },
  { label: 'Emergency', value: 6 },
  { label: 'Deferred', value: 7 },
  { label: 'Optional', value: 8 },
  { label: 'Routine', value: 9 }
];
const statuses = [
  { label: 'Pending', value: 0 },
  { label: 'Processing', value: 1 },
  { label: 'Processed', value: 2 },
  { label: 'Completed', value: 3 },
  { label: 'Cancelled', value: 4 }
];

const fetchCatalogDetails = async () => {
  try {
    const response = await api.get(`/task/catalog/${catalogId}`);
    const catalogData = response.data.data;
    catalog.value = {
      category_id: catalogData.category_id,
      title: catalogData.title,
      description: catalogData.description,
      _priority: catalogData._priority, // Use _priority from API response
      _status: catalogData._status // Use _status from API response
    };
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Error fetching catalog details: " + error 
    });
  }
};

const fetchCategories = async () => {
  try {
    const response = await api.get(`/task/category`);
    categories.value = response.data.data;
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Error fetching categories: " + error 
    });
  }
};

const updateCatalog = async () => {
  try {
    const response = await api.put(`/task/catalog/${catalogId}`, catalog.value);
    // Show toast notification based on the server response json object
    Toast.fire({
      icon: response?.data?.throwable?.status,
      title: response?.data?.throwable?.message
    });
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Error updating catalog: " + error 
    });
  }
};

// Fetch catalog details from API when component is mounted
onMounted(() => {
  fetchCatalogDetails();
  fetchCategories();
});
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
  
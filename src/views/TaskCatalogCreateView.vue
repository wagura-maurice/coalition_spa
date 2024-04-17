src/views/TaskCatalogCreateView.vue
<template>
    <div class="max-w-lg mx-auto mt-8">
        <h1 class="self-center text-2xl font-bold mb-4 whitespace-nowrap">Enter Task Catalog Details:</h1>
        <form @submit.prevent="createCatalog">
            <!-- Priority Checkboxes Container -->
            <div class="mb-6">
                <label class="block mb-2 text-lg font-bold font-medium text-gray-900">Priority *</label>
                <hr class="mb-2">
                <br>
                <div class="grid grid-cols-2 gap-4">
                    <div v-for="(priority, index) in priorities" :key="index" class="flex items-center">
                        <input :id="'priority-checkbox-' + priority.value" type="checkbox" :value="priority.value" v-model="catalog._priority" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" @change="handlePriorityChange(priority.value)">
                        <label :for="'priority-checkbox-' + priority.value" class="ms-2 text-sm font-bold text-gray-900">{{ priority.label }}</label>
                    </div>
                </div>
                <br>
                <hr class="mb-2">
            </div>
            
            <!-- Category Dropdown -->
            <div class="mb-6">
                <label for="category" class="block mb-2 text-lg font-bold font-medium text-gray-900">Category *</label>
                <select v-model="catalog.category_id" id="category" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <option value="" disabled>Select a category</option>
                    <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
                </select>
            </div>
            
            <div class="mb-6">
                <label for="name" class="block mb-2 text-lg font-bold font-medium text-gray-900">Catalog Name *</label>
                <input v-model="catalog.title" type="text" id="name" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter task catalog name" required>
            </div>
            
            <div class="mb-6">
                <label for="description" class="block mb-2 text-lg font-bold font-medium text-gray-900">Catalog Description</label>
                <textarea v-model="catalog.description" id="description" rows="10" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your task catalog description here..."></textarea>
            </div>

            <!-- Status Checkboxes Container -->
            <div class="mb-6">
                <label class="block mb-2 text-lg font-bold font-medium text-gray-900">Status *</label>
                <hr class="mb-2">
                <br>
                <div class="grid grid-cols-2 gap-4">
                    <div v-for="(status, index) in statuses" :key="index" class="flex items-center">
                        <input :id="'status-checkbox-' + status.value" type="checkbox" :value="status.value" v-model="catalog._status" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" @change="handleStatusChange(status.value)">
                        <label :for="'status-checkbox-' + status.value" class="ms-2 text-sm font-bold text-gray-900">{{ status.label }}</label>
                    </div>
                </div>
                <br>
                <hr class="mb-2">
            </div>
            
            <button type="submit" class="block w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-6 py-3.5 text-center me-2 mb-2">Submit</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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

const catalog = ref({
    category_id: '',
    title: '',
    description: '',
    _priority: null,
    _status: null
});

const categories = ref([]);

// Priority options
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

// Status options
const statuses = [
{ label: 'Pending', value: 0 },
{ label: 'Processing', value: 1 },
{ label: 'Processed', value: 2 },
{ label: 'Completed', value: 3 },
{ label: 'Cancelled', value: 4 }
];

// Fetch categories from API when component is mounted
onMounted(async () => {
    try {
        const response = await api.get('/task/category');
        categories.value = response.data.data;
    } catch (error) {
        // console.error('Error fetching categories:', error);
        Toast.fire({
            icon: "error",
            title: "Error fetching categories: " + error 
        });
    }
});

const createCatalog = async () => {
    try {
        const response = await api.post('/task/catalog', catalog.value);
        // show toast notification based on the server response json object
        Toast.fire({
            icon: response?.data?.throwable?.status,
            title: response?.data?.throwable?.message
        });
        // reset the form if response status is 201
        if (response.status === 201) {
            catalog.value = { category_id: '', title: '', description: '', _priority: null, _status: null };
        }
    } catch (error) {
        // console.error('Error creating catalog:', error);
        // show toast notification based on the error message
        Toast.fire({
            icon: "error",
            title: "Error creating catalog: " + error 
        });
    }
};

const handlePriorityChange = (selectedPriority) => {
    // Uncheck all other checkboxes when a checkbox is checked
    priorities.forEach(priority => {
        if (priority.value !== selectedPriority) {
            priority.checked = false;
        }
    });
    catalog.value._priority = selectedPriority;
};

const handleStatusChange = (selectedStatus) => {
    // Uncheck all other checkboxes when a checkbox is checked
    statuses.forEach(status => {
        if (status.value !== selectedStatus) {
            status.checked = false;
        }
    });
    catalog.value._status = selectedStatus;
};
</script>

<style scoped>
/* Add your custom styles here */
</style>

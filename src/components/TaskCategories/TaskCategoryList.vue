// src/components/TaskCategories/TaskCategoryList.vue
<template>
  <!-- Category Table -->
  <div class="block mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
      <div class="flex items-center">
        <select v-model="perPage" id="entriesPerPage" class="block p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2 h-10" @change="updateEntriesPerPage">
          <option v-for="option in perPageOptions" :value="option" :key="option">{{ option }}</option>
        </select>
        <label for="entriesPerPage" class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Entries per page:
        </label>
      </div>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input 
        type="text" 
        name="search" 
        id="search" 
        class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10" 
        placeholder="Search for task categories ..." 
        @input="searchCategories($event.target.value)"
        >
        <i 
        class="fa-solid fa-square-caret-down fa-2x fa-inverse absolute end-2.5 bottom-1 text-crimson-500 dark:text-cyan-600 cursor-pointer" 
        @click="showAdvancedSearch = !showAdvancedSearch"
        ></i>
      </div>
    </div>
    
    <div v-show="showAdvancedSearch" class="border-t border-gray-200 dark:border-gray-700 pt-4 w-80 mx-auto">
      <!-- Date range picker -->
      <div class="mb-4">
        <label for="created_at_date_range" class="text-sm font-normal text-gray-500 dark:text-gray-400 block mb-2 md:mb-0">Created At Date range:</label>
        <!-- Date range picker component goes here -->
        <div class="flex items-center space-x-2">
          <VueDatePicker v-model="date" :enable-time-picker="false" :range="{ partialRange: false }" />
        </div>
      </div>
      
      <!-- Reset and close/submit buttons -->
      <div class="flex justify-between">
        <!-- Reset button -->
        <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" @click="resetAdvancedSearch">Reset</button>
        
        <!-- Close button -->
        <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" @click="showAdvancedSearch = false">Close</button>
        
        <!-- Submit button -->
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" @click="submitAdvancedSearch">Submit</button>
      </div>
      <br>
    </div>
    
    <div id="alert-border-1" class="flex items-center p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800" role="alert">
      <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <div class="ms-3 text-sm font-medium">
        you have selected 100 out of 200 records
      </div>
      <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-1" aria-label="Close">
        <span class="sr-only">Dismiss</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
    
    <table v-if="categories?.data?.length > 0" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="p-4">
            <div class="flex items-center">
              <input 
              name="checkbox-all-search" 
              id="checkbox-all-search" 
              value="" 
              type="checkbox" 
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              @change="selectAllCategories($event.target.checked)"
              >
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th>
          <th scope="col" class="px-6 py-3"><i class="fa-solid fa-hashtag"></i></th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="category in categories?.data" :key="category.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input 
              :name="'checkbox-' + category.id" 
              :id="'checkbox-' + category.id" 
              :value="category.id" 
              type="checkbox" 
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              @change="toggleCategorySelection(category.id, $event.target.checked)"
              >
              <label :for="'checkbox-' + category.id" class="sr-only">checkbox</label>
            </div>
          </td>
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"># {{ category.id }}</td>
          <td class="px-6 py-4">{{ category?.name }}</td>
          <td class="px-6 py-4">{{ category?.description }}</td>
          <td class="px-6 py-4">
            <div class="flex space-x-4">
              <RouterLink :to="{ name: 'task_category_edit_view', params: { id: category.id } }">
                <button class="text-blue-500 hover:text-blue-700 flex items-center" title="Edit">
                  <i class="fa-solid fa-pen-to-square text-lg"></i>
                </button>
              </RouterLink>
              <button @click="confirmDelete(category.id)" class="text-red-500 hover:text-red-700 flex items-center" title="Delete">
                <i class="fa-solid fa-trash-can text-lg"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- No records found message -->
    <div v-else id="alert-border-2" class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
      <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <div class="ms-3 text-sm font-medium">
        No task categories found. Please try again later!
      </div>
    </div>
    
    <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing <span class="font-semibold text-gray-900 dark:text-white">{{ categories?.meta?.from }}-{{ categories?.meta?.to }}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ categories?.meta?.total }}</span>
      </span>
      <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <a @click.prevent="goToPage(categories.meta.current_page - 1)"
          :class="{
            'flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': true,
            'pointer-events-none': !categories?.links?.prev
          }" v-html="categories?.meta?.links[0].label"></a>
        </li>
        <template v-for="(page, index) in categories?.meta?.links.slice(1, -1)" :key="index">
          <li>
            <a @click.prevent="goToPage(page.label)"
            :class="{
              'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': true,
              'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': page.active
            }">
            {{ page.label }}
          </a>
        </li>
      </template>
      <li>
        <a @click.prevent="goToPage(categories.meta.current_page + 1)"
        :class="{
          'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': true,
          'pointer-events-none': !categories?.links?.next
        }" v-html="categories?.meta?.links.slice(-1)[0].label"></a>
      </li>
    </ul>
  </nav>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/compositions/index';
import Swal from 'sweetalert2';
import api from '@/api/index';

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

// Define variables and functions
const perPageOptions = [10, 25, 50, 75, 100];
const perPage = ref(perPageOptions[0]);
const { categories, loadCategories } = useTaskStore();
const currentPage = categories?.meta?.current_page ?? ref(1);

const showAdvancedSearch = ref(false);
// Method to reset advanced search fields
const resetAdvancedSearch = () => {
  // Reset the date range picker to today
  const startDate = new Date(new Date().setDate(new Date().getDate() - 7));
  const endDate = new Date();
  date.value = [startDate, endDate];
};


// Method to submit advanced search
// Method to submit advanced search
const submitAdvancedSearch = () => {
  // Extract start and end dates from date.value array
  const startDate = date.value[0].toISOString().split('T')[0];
  const endDate = date.value[1].toISOString().split('T')[0];
  
  // Concatenate start and end dates with a backslash separator
  const dateRangeString = startDate + '\\' + endDate;
  
  // Log the date range value as a string
  // console.log("Date Range:", dateRangeString);
  loadCategories({
    filter: {
      name: null,
      description: null,
      search: null,
      created_at_date_range: dateRangeString
    }
  },
  currentPage?.value || null,
  perPage.value,
  [null]
  );
  
  // You can add further functionality to handle the submission of advanced search here
};

const date = ref();

// Fetch categories on component mount
onMounted(() => {
  loadCategories({
    filter: {
      name: null,
      description: null,
      search: null,
      created_at_date_range: null
    }
  },
  currentPage?.value || null,
  perPage.value,
  [null]
  );
  
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});

// Add a method to handle checkbox-all-search change event
const selectAllCategories = (checked) => {
  categories.value.data.forEach((category) => {
    if (checked) {
      // console.log('here');
      // If checkbox-all-search is checked, select all categories
      selectedCategories.value.add(category.id);
    } else {
      // console.log('there');
      // If checkbox-all-search is unchecked, deselect all categories
      selectedCategories.value.delete(category.id);
    }
  });
};

// Add a method to handle individual checkbox changes
const toggleCategorySelection = (categoryId, checked) => {
  if (checked) {
    // If checkbox is checked, add category to selectedCategories
    selectedCategories.value.add(categoryId);
  } else {
    // If checkbox is unchecked, remove category from selectedCategories
    selectedCategories.value.delete(categoryId);
  }

  // After toggling category selection, show the count of selected records
  showSelectedCountNotification();
};

// Update the notification to display the count of selected records
const showSelectedCountNotification = () => {
  const totalCount = categories.value.meta.total;
  const selectedCount = selectedCategories.value.size;
  const message = `You have selected ${selectedCount} out of ${totalCount} records`;
  console.log(message);
};

// Define a reactive set to store selected category IDs
const selectedCategories = ref(new Set());

// Method to confirm category deletion
const confirmDelete = (categoryId) => {
  // Show confirmation modal
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      deleteCategory(categoryId);
    }
  });
};

// Method to delete a category
const deleteCategory = async (categoryId) => {
  try {
    // Call the delete category API action passing the category id
    let response = await api.delete(`/task/category/${categoryId}`);
    // Show toast notification based on the server response
    Toast.fire({
      icon: response?.data?.throwable?.status,
      title: response?.data?.throwable?.message
    });
    // Reload categories after deletion
    loadCategories({
      filter: {
        name: null,
        description: null,
        search: null,
        created_at_date_range: null
      }
    },
    currentPage?.value || null,
    perPage.value,
    [null]
    );
  } catch (error) {
    // console.error('Error deleting category:', error);
    // Show toast notification based on the error message
    Toast.fire({
      icon: "error",
      title: "Error deleting category: " + error 
    });
  }
};

// Method to fetch categories based on search text
const searchCategories = async (value) => {
  loadCategories(
  {
    // Set the filter properties with the desired values
    filter: {
      name: null,
      description: null,
      search: value || null,
      created_at_date_range: null
    }
  },
  currentPage?.value || null,
  perPage.value,
  [null]
  );
};

// Method to navigate to a specific page
const goToPage = async (page) => {
  loadCategories(
  {
    filter: {
      name: null,
      description: null,
      search: null,
      created_at_date_range: null
    }
  },
  page,
  perPage.value,
  [null]
  );
};

// Method to update entries per page
const updateEntriesPerPage = () => {
  loadCategories(
  {
    filter: {
      name: null,
      description: null,
      search: null,
      created_at_date_range: null
    }
  },
  currentPage?.value || null,
  perPage.value,
  [null]
  );
};
</script>

<style>
/* Add your tailwind styles here if needed */
</style>

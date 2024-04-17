// src/components/TaskCatalogs/TaskCatalogList.vue
<template>
  <!-- Catalog Table -->
  <div class="block mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
      <div class="flex items-center">
        <select v-model="perPage" id="entriesPerPage" class="block p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2 h-10" @change="updateEntriesPerPage">
          <option v-for="option in perPageOptions" :value="option" :key="option">{{ option }}</option>
        </select>
        <label for="entriesPerPage" class="text-xs text-gray-500 font-bold hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
          ENTRIES PER PAGE:
        </label>
      </div>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input 
        type="text" 
        v-model="searchParameter" 
        id="search" 
        class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10" 
        placeholder="Search for task catalogs ..."
        >
        <i 
        class="fa-solid fa-square-caret-down fa-2x fa-inverse absolute end-2.5 bottom-1 text-crimson-500 dark:text-cyan-600 cursor-pointer" 
        @click="showAdvancedSearch = !showAdvancedSearch"
        ></i>
      </div>
    </div>
    
    <div v-show="showAdvancedSearch" class="border-t border-gray-200 dark:border-gray-700 pt-4 mx-auto">
      <!-- Priority dropdown -->
      <div class="mb-4">
        <label for="priority" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Priority</label>
        <select v-model="selectedPriority" id="priority" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="" selected>All</option>
          <option value="0">Urgent</option>
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
          <option value="4">Critical</option>
          <option value="5">Normal</option>
          <option value="6">Emergency</option>
          <option value="7">Deferred</option>
          <option value="8">Optional</option>
          <option value="9">Routine</option>
        </select>
      </div>
      
      <!-- Status dropdown -->
      <div class="mb-4">
        <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Status</label>
        <select v-model="selectedStatus" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="" selected>All</option>
          <option value="0">Pending</option>
          <option value="1">Processing</option>
          <option value="2">Processed</option>
          <option value="3">Completed</option>
          <option value="4">Cancelled</option>
        </select>
      </div>
      
      <!-- Date range picker -->
      <div class="mb-4">
        <label for="due_date_range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date Range:</label>
        <!-- Date range picker component goes here -->
        <div class="flex items-center space-x-2">
          <VueDatePicker v-model="dueDateRange" :enable-time-picker="false" :range="{ partialRange: false }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
      </div>
      
      <!-- Reset and close/submit buttons -->
      <div class="flex justify-between">
        <!-- Reset button -->
        <button class="text-gray-500 font-bold hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" @click="resetAdvancedSearch">Reset</button>
        
        <!-- Close button -->
        <button class="text-gray-500 font-bold hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" @click="showAdvancedSearch = false">Close</button>
        
        <!-- Submit button -->
        <!-- <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" @click="submitAdvancedSearch">Submit</button> -->
      </div>
      <br>
      <hr>
      <br>
    </div>
    
    <table v-if="catalogs?.data?.length > 0" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="p-4">
            <div class="flex items-center">
              <input name="checkbox-all-search" id="checkbox-all-search" value="" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th>
          <th scope="col" class="px-6 py-3 font-extrabold"><i class="fa-solid fa-hashtag"></i></th>
          <th scope="col" class="px-6 py-3 font-extrabold">Title</th>
          <th scope="col" class="px-6 py-3 font-extrabold">Description</th>
          <th scope="col" class="px-6 py-3 font-extrabold">Category</th>
          <th scope="col" class="px-6 py-3 font-extrabold">Priority</th>
          <th scope="col" class="px-6 py-3 font-extrabold">Status</th>
          <th scope="col" class="px-6 py-3 font-extrabold">Due Date</th>
          <th scope="col" class="px-6 py-3 font-extrabold">Actions</th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="catalog in catalogs?.data" :key="catalog.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input :name="'checkbox-' + catalog.id" :id="'checkbox-' + catalog.id" :value="catalog.id" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label :for="'checkbox-' + catalog.id" class="sr-only">checkbox</label>
            </div>
          </td>
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"># {{ catalog._uid }}</td>
          <td class="px-6 py-4" :title="catalog?.slug">{{ catalog?.title }}</td>
          <td class="px-6 py-4">{{ catalog?.description }}</td>
          <td class="px-6 py-4">{{ catalog?.category?.name }}</td>
          <td class="px-6 py-4">{{ getPriorityName(catalog?._priority) }}</td>
          <td class="px-6 py-4">{{ getStatusName(catalog?._status) }}</td>
          <td class="px-6 py-4">{{ formatDueDate(catalog?.due_date) }}</td>
          <td class="px-6 py-4">
            <div class="flex space-x-4">
              <RouterLink :to="{ name: 'task_catalog_edit_view', params: { id: catalog.id } }">
                <button class="text-blue-500 hover:text-blue-700 flex items-center" title="Edit">
                  <i class="fa-solid fa-pen-to-square text-lg"></i>
                </button>
              </RouterLink>
              <button @click="confirmDelete(catalog.id)" class="text-red-500 hover:text-red-700 flex items-center" title="Delete">
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
        No task catalogs found. Please try again later!
      </div>
    </div>
    
    <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing <span class="font-semibold text-gray-900 dark:text-white">{{ catalogs?.meta?.from }}-{{ catalogs?.meta?.to }}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ catalogs?.meta?.total }}</span>
      </span>
      <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <a @click.prevent="goToPage(catalogs.meta.current_page - 1)"
          :class="{
            'flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': true,
            'pointer-events-none': !catalogs?.links?.prev
          }" v-html="catalogs?.meta?.links[0].label"></a>
        </li>
        <template v-for="(page, index) in catalogs?.meta?.links.slice(1, -1)" :key="index">
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
        <a @click.prevent="goToPage(catalogs.meta.current_page + 1)"
        :class="{
          'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': true,
          'pointer-events-none': !catalogs?.links?.next
        }" v-html="catalogs?.meta?.links.slice(-1)[0].label"></a>
      </li>
    </ul>
  </nav>
</div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { getPriorityName, getStatusName, formatDueDate } from '@/utility/helper';
import { useTaskStore } from '@/compositions/index';
import Swal from 'sweetalert2';
import api from '@/api/index';

// Define variables and functions
const perPageOptions = [10, 25, 50, 75, 100];
const perPage = ref(perPageOptions[0]);
const { catalogs, loadCatalogs } = useTaskStore();
const currentPage = catalogs?.meta?.current_page ?? ref(1);
const showAdvancedSearch = ref(false);
const searchParameter = ref("");
const selectedPriority = ref("");
const selectedStatus = ref("");
const dueDateRange = ref(null);

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

// Method to get the due date range string
const getDateRangeString = () => {
  if (dueDateRange.value) {
    const startDate = dueDateRange.value[0].toISOString().split('T')[0];
    const endDate = dueDateRange.value[1].toISOString().split('T')[0];
    return startDate + '\\' + endDate;
  }
  return null;
};

// Method to update entries per page
const updateEntriesPerPage = () => {
  loadCatalogs(
  {
    filter: {
      _priority: selectedPriority.value,
      _status: selectedStatus.value,
      search: searchParameter.value,
      due_date_range: getDateRangeString()
    }
  },
  currentPage?.value || null,
  perPage.value,
  ['category']
  );
};

// Method to search catalogs based on both simple and advanced search parameters
const searchCatalogs = () => {
  loadCatalogs(
  {
    filter: {
      _priority: selectedPriority.value,
      _status: selectedStatus.value,
      search: searchParameter.value,
      due_date_range: getDateRangeString()
    }
  },
  currentPage?.value || null,
  perPage.value,
  ['category']
  );
};

// Method to reset advanced search fields
const resetAdvancedSearch = () => {
  // Reset the date range picker to today
  const startDate = new Date(new Date().setDate(new Date().getDate() - 7));
  const endDate = new Date();
  
  searchParameter.value = "";
  selectedPriority.value = "";
  selectedStatus.value = "";
  dueDateRange.value = [startDate, endDate];
};

// Method to confirm catalog deletion
const confirmDelete = (catalogId) => {
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
      deleteCatalog(catalogId);
    }
  });
};

// Method to delete a catalog
const deleteCatalog = async (catalogId) => {
  try {
    // Call the delete catalog API action passing the catalog id
    let response = await api.delete(`/task/catalog/${catalogId}`);
    // Show toast notification based on the server response
    Toast.fire({
      icon: response?.data?.throwable?.status,
      title: response?.data?.throwable?.message
    });
    // Reload categories after deletion
    loadCatalogs({
      filter: {
        _priority: selectedPriority.value,
        _status: selectedStatus.value,
        search: searchParameter.value,
        due_date_range: getDateRangeString()
      }
    },
    currentPage?.value || null,
    perPage.value,
    ['category']
    );
  } catch (error) {
    // console.error('Error deleting catalog:', error);
    // Show toast notification based on the error message
    Toast.fire({
      icon: "error",
      title: "Error deleting catalog: " + error 
    });
  }
};

// Method to navigate to a specific page
const goToPage = async (page) => {
  loadCatalogs({
    filter: {
      _priority: selectedPriority.value,
      _status: selectedStatus.value,
      search: searchParameter.value,
      due_date_range: getDateRangeString()
    }
  },
  page,
  perPage.value,
  ['category']
  );
};

// Fetch catalogs on component mount
onMounted(() => {
  loadCatalogs({
    filter: {
      _priority: selectedPriority.value,
      _status: selectedStatus.value,
      search: searchParameter.value,
      due_date_range: getDateRangeString()
    }
  },
  currentPage?.value || null,
  perPage.value,
  ['category']
  );
  
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  dueDateRange.value = [startDate, endDate];
});

// Watch for changes in selected priority, status, due date range, and search parameter
watch([searchParameter, selectedPriority, selectedStatus, dueDateRange], () => {
  searchCatalogs();
});

</script>


<style>
/* Add your tailwind styles here if needed */
</style>

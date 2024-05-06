// src/components/TaskCatalogs/TaskCatalogList.vue
<template>
  <!-- Catalog Table -->
  <div class="block mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
      <div class="flex items-center">
        <select v-model="pageSize" @change="changePageSize" id="entriesPerPage" class="block p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2 h-10">
          <option v-for="option in perPageOptions" :value="option" :key="option">{{ option }}</option>
        </select>
        <label for="entriesPerPage" class="text-xs text-gray-500 font-bold hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
          ENTRIES PER PAGE:
        </label>
      </div>
      
      <!-- Action bar group for when a row is selected individually or even when select all -->
      <div v-show="selectedRows.length > 0" class="inline-flex rounded-md shadow-sm" role="group">
        <div class="relative">
          <button @click="showExportActionsDropdown" type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            Export Data
            <i class="fas fa-caret-down ml-2"></i>
          </button>
          <div class="absolute bg-white border border-gray-200 rounded-lg shadow-lg py-2 px-4 mt-2 z-10 right-0" @click.stop>
            <ul>
              <li @click="exportToCSV" class="text-sm font-bold text-gray-600">CSV</li>
              <li @click="exportToPDF" class="text-sm font-bold text-gray-600">PDF</li>
            </ul>
          </div>
        </div>
        <div class="relative mx-0.5">
          <button @click="showPriorityActionsDropdown" type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            Update Priority
            <i class="fas fa-caret-down ml-2"></i>
          </button>
          <div class="absolute bg-white border border-gray-200 rounded-lg shadow-lg py-2 px-4 mt-2 z-10 right-0" @click.stop>
            <ul>
              <li v-for="priority in priorities" :key="priority.id" @click="updatePriority(priority.value)" class="text-sm font-bold text-gray-600">{{ priority.label }}</li>
            </ul>
          </div>
        </div>
        <div class="relative">
          <button @click="showStatusActionsDropdown" type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            Update Status
            <i class="fas fa-caret-down ml-2"></i>
          </button>
          <div class="absolute bg-white border border-gray-200 rounded-lg shadow-lg py-2 px-4 mt-2 z-10 right-0" @click.stop>
            <ul>
              <li v-for="status in statuses" :key="status.id" @click="updateStatus(status.value)" class="text-sm font-bold text-gray-600">{{ status.label }}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="relative">
        <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" v-model="searchTerm" @input="handleSearch" id="search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10" placeholder="Search for task catalogs ...">
        <i class="fa-solid fa-square-caret-down fa-2x fa-inverse absolute end-2.5 bottom-1 text-crimson-500 dark:text-cyan-600 cursor-pointer" @click="showAdvancedSearch = !showAdvancedSearch"></i>
      </div>
    </div>
    <div v-show="showAdvancedSearch" class="border-t border-gray-200 dark:border-gray-700 pt-4 mx-auto">
      <div class="mb-4">
        <label for="priority" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Priority</label>
        <select v-model="selectedPriority" id="priority" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="" selected class="font-bold">All</option>
          <option v-for="priority in priorities" :key="priority.value" :value="priority.value" class="font-bold">{{ priority.label }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Status</label>
        <select v-model="selectedStatus" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="" selected class="font-bold">All</option>
          <option v-for="status in statuses" :key="status.value" :value="status.value" class="font-bold">{{ status.label }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="due_date_range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date Range:</label>
        <div class="flex items-center space-x-2">
          <VueDatePicker v-model="dueDateRange" :enable-time-picker="false" :range="{ partialRange: false }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
      </div>
      <div class="flex justify-between">
        <button class="text-gray-500 font-bold hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" @click="resetAdvancedSearch">Reset</button>
        <button class="text-gray-500 font-bold hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" @click="showAdvancedSearch = false">Close</button>
      </div>
      <br>
      <hr>
      <br>
    </div>
    <div class="relative overflow-x-auto">
      <table v-if="tasks && tasks.length > 0 && meta && meta.links && meta.links.length > 0" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input name="checkbox-all-search" id="checkbox-all-search" value="" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" v-model="selectAll" @change="toggleAll">
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
          <tr v-for="catalog in tasks" :key="catalog.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input :name="'checkbox-' + catalog._uid" :id="'checkbox-' + catalog._uid" v-model="selectedRows" :value="catalog.id" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label :for="'checkbox-' + catalog.id" class="sr-only">checkbox</label>
              </div>
            </td>
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"># {{ catalog.id }}</td>
            <td class="px-6 py-4" :title="catalog?.slug">{{ catalog?.title }}</td>
            <td class="px-6 py-4">{{ truncatedDescription(catalog?.description) }}</td>
            <td class="px-6 py-4">{{ catalog?.category?.name }}</td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div :class="'h-2.5 w-2.5 rounded-full ' + getPriorityColor(catalog?._priority) + ' me-2'"></div> {{ getPriorityName(catalog?._priority) }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div :class="'h-2.5 w-2.5 rounded-full ' + getStatusColor(catalog?._status) + ' me-2'"></div> {{ getStatusName(catalog?._status) }}
              </div>
            </td>
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
      <nav v-if="tasks && tasks.length > 0 && meta && meta.links && meta.links.length > 0" class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing <span class="font-semibold text-gray-900 dark:text-white">{{ meta?.from }}-{{ meta?.to }}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ meta?.total }}</span>
        </span>
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a @click.prevent="goToPage(meta?.current_page - 1)"
            :class="{
              'flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': true,
              'pointer-events-none': !links?.prev
            }" v-html="meta?.links[0].label"></a>
          </li>
          <template v-for="(page, index) in meta?.links.slice(1, -1)" :key="index">
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
          <a @click.prevent="goToPage(meta?.current_page + 1)"
          :class="{
            'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': true,
            'pointer-events-none': !links?.next
          }" v-html="meta?.links.slice(-1)[0].label"></a>
        </li>
      </ul>
    </nav>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import api from '@/api/index';
import {
  getPriorityName,
  getPriorityColor,
  getStatusName,
  getStatusColor,
  formatDueDate,
  truncatedDescription
} from '@/utility/helper';
import taskStore from '@/stores/taskStore';
import store from '@/stores/rowSelectionStore';

const tasks = ref([]);
const meta = ref({});
const links = ref({});
const pages = ref([]);

// Reactive variables
const perPageOptions = [10, 25, 50, 75, 100];
const showAdvancedSearch = ref(false);
const selectedPriority = ref("");
const selectedStatus = ref("");
const dueDateRange = ref(null);
const searchTerm = ref("");
const pageSize = ref(10);
const selectedRows = ref([]);
const unselectedRows = ref([]); // Initially empty
const selectAll = ref(false);
const showActionsDropdown = ref(false);

const showExportActionsDropdown = ref(false);
const showPriorityActionsDropdown = ref(false);
const showStatusActionsDropdown = ref(false);

const exportDialogOpen = ref(false);
const showExportDialog = ref(false);
const priorityDialogOpen = ref(false);
const showPriorityDialog = ref(false);
const statusDialogOpen = ref(false);
const showStatusDialog = ref(false);

// SweetAlert2 toast configuration
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

// Priority and status options
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

const fetchData = async (page = 1) => {
  try {
    let response = await taskStore.dispatch('fetchCatalogs', {
      filters: {
        _priority: selectedPriority.value,
        _status: selectedStatus.value,
        search: searchTerm.value,
        due_date_range: getDateRangeString()
      },
      pageNumber: page,
      pageSize: pageSize.value,
      includes: ['category']
    });
    
    // Check if the response contains the expected structure
    if (response && response.data) {
      tasks.value = response.data;
      meta.value = response.meta;
      links.value = response.links;
      pages.value = response.meta.links.slice(1, -1);
      
      // Reset unselectedRows to an empty array on each fetch
      unselectedRows.value = [];
      // Update Vuex store
      store.dispatch('saveUnselectedRows', []);
    } else {
      console.error('Response does not contain data:', response);
    }
  } catch (error) {
    console.error('Error fetching catalogs:', error);
  }
};

onMounted(async () => {
  fetchData();

  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 300));
  dueDateRange.value = [startDate, endDate];
  
  // Load selected rows and select all state from Vuex store
  store.dispatch('loadSelectedRows');
  store.dispatch('loadSelectAllState');
});

// Watch for changes in selected priority, status, due date range, and search term
watch([searchTerm, selectedPriority, selectedStatus, dueDateRange], () => {
  fetchData();
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

// Method to handle search
const handleSearch = () => {
  fetchData();
};

// Method to toggle all rows selection
const toggleAll = () => {
  store.commit('setSelectAll', !store.state.selectAll);
  if (store.state.selectAll) {
    const selectedRowsOnCurrentPage = tasks.value.map(task => task.id);
    selectedRows.value = [...new Set([...selectedRows.value, ...selectedRowsOnCurrentPage])];
  } else {
    selectedRows.value = [];
  }
};

// Method to change page size
const changePageSize = () => {
  const currentPage = Math.ceil(meta.value.current_page / pageSize.value);
  const previousPageSize = pageSize.value;
  
  fetchData();
  
  if (pageSize.value > previousPageSize) {
    const selectedRowsOnCurrentPage = tasks.value
    .slice((currentPage - 1) * pageSize.value, currentPage * pageSize.value)
    .map(task => task.id);
    
    selectedRows.value = store.state.selectAll ? [...selectedRows.value, ...selectedRowsOnCurrentPage] : [];
  }
};

// Method to toggle actions dropdown
const toggleExportActions = () => {
  showExportActionsDropdown.value = !showExportActionsDropdown.value;
};

const togglePriorityActions = () => {
  showPriorityActionsDropdown.value = !showPriorityActionsDropdown.value;
};

const toggleStatusActions = () => {
  showStatusActionsDropdown.value = !showStatusActionsDropdown.value;
};

// Method to confirm catalog deletion
const confirmDelete = catalogId => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(result => {
    if (result.isConfirmed) {
      deleteCatalog(catalogId);
    }
  });
};

// Method to delete a catalog
const deleteCatalog = async catalogId => {
  try {
    const response = await api.delete(`/task/catalog/${catalogId}`);
    Toast.fire({
      icon: response?.data?.throwable?.status,
      title: response?.data?.throwable?.message
    });
    
    fetchData();
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Error deleting catalog: " + error
    });
  }
};

// Method to navigate to a specific page
const goToPage = async (page) => {
  try {
    fetchData();
    
    if (store.state.selectAll) {
      const selectedRowsOnCurrentPage = tasks.value.map(task => task.id);
      const newSelectedRows = [...selectedRows.value, ...selectedRowsOnCurrentPage];
      selectedRows.value = [...new Set(newSelectedRows)];
    } else {
      const newUnselectedRows = tasks.value.map(task => task.id);
      unselectedRows.value = newUnselectedRows;
      store.dispatch('saveUnselectedRows', newUnselectedRows);
    }
  } catch (error) {
    console.error('Error fetching catalogs:', error);
  }
};

// Method to perform export to CSV
const exportToCSV = () => {
  console.log('Exporting to CSV');
};

// Method to perform export to PDF
const exportToPDF = () => {
  console.log('Exporting to PDF');
};

// Method to update priority
const updatePriority = priority => {
  console.log('Selected priority:', priority);
  showPriorityDialog.value = true;
};

// Method to update status
const updateStatus = status => {
  console.log('Selected status:', status);
  showStatusDialog.value = true;
};
</script>

<style scoped>
/* Add your tailwind styles here if needed */
</style>
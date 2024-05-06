// src/views/TaskCatalogsView.vue
<template>
  <div class="task-catalogs-view">
    <!-- Title and Button Section -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Task Catalogs</h1>
      <RouterLink to="/task/catalog/create">
        <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5">
          <i class="fa-solid fa-plus"></i> New Catalog
        </button>
      </RouterLink>
    </div>
    
    <!-- Task Catalog List -->
    <div class="overflow-x-auto">
      <TaskCatalogList />
    </div>
  </div>
</template>

<script>
import TaskCatalogList from '@/components/TaskCatalogs/TaskCatalogList.vue';

export default {
  components: {
    TaskCatalogList
  }
};
</script>

<style scoped>
  .task-catalogs-view {
    margin-top: 6.5rem;
  }
</style>

// src/views/TaskCategoryListView.vue
<template>
  <div class="container mx-auto">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Task Categories</h1>
      <RouterLink to="/task/category/create">
        <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
          <i class="fa-solid fa-plus"></i> New Category
        </button>
      </RouterLink>
    </div>
    <TaskCategoryList />
  </div>
</template>

<script>
import TaskCategoryList from '@/components/TaskCategories/TaskCategoryList.vue';

export default {
  components: {
    TaskCategoryList
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
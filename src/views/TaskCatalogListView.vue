// src/views/TaskCatalogsView.vue
<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">Task Catalogs</h1>
    <div class="overflow-x-auto">
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="px-4 py-2 bg-gray-200 border border-gray-300">ID</th>
            <th class="px-4 py-2 bg-gray-200 border border-gray-300">Title</th>
            <th class="px-4 py-2 bg-gray-200 border border-gray-300">Description</th>
            <!-- Add more table headers as needed -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="catalog in catalogs" :key="catalog.id">
            <td class="px-4 py-2 border border-gray-300">{{ catalog.id }}</td>
            <td class="px-4 py-2 border border-gray-300">{{ catalog.title }}</td>
            <td class="px-4 py-2 border border-gray-300">{{ catalog.description }}</td>
            <!-- Add more table cells as needed -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catalogs: [
        // Replace this with your actual data from the Vuex store or API
        { id: 1, title: 'Catalog 1', description: 'Description 1' },
        { id: 2, title: 'Catalog 2', description: 'Description 2' },
        { id: 3, title: 'Catalog 3', description: 'Description 3' }
      ]
    };
  }
};
</script>

<style>
/* Add any custom styles here */
</style>

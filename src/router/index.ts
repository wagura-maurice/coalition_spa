// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/task/catalog'
    },
    {
      path: '/task/catalog',
      name: 'task_catalog_list_view',
      component: () => import('../views/TaskCatalogListView.vue')
    },
    {
      path: '/task/catalog/create',
      name: 'task_catalog_create_view',
      component: () => import('../views/TaskCatalogCreateView.vue')
    },
    {
      path: '/task/catalog/:id/edit',
      name: 'task_catalog_edit_view',
      component: () => import('../views/TaskCatalogEditView.vue')
    },
    {
      path: '/task/category',
      name: 'task_category_list_view',
      component: () => import('../views/TaskCategoryListView.vue')
    },
    {
      path: '/task/category/create',
      name: 'task_category_create_view',
      component: () => import('../views/TaskCategoryCreateView.vue')
    },
    {
      path: '/task/category/:id/edit',
      name: 'task_category_edit_view',
      component: () => import('../views/TaskCategoryEditView.vue')
    }
  ]
})

export default router

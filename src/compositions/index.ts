// src/compositions/index.ts
import { computed } from 'vue';
import { useStore } from 'vuex';

export interface TaskCategory {
  id: number;
  name: string;
  description: string | null;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface TaskCatalog {
  id: number;
  _uid: string;
  category_id: number;
  title: string;
  slug: string | null;
  description: string | null;
  due_date: Date | null;
  _priority: number;
  _status: number;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface RootState {
  categories: TaskCategory[];
  catalogs: TaskCatalog[];
}

export function useTaskStore() {
  const store = useStore<RootState>();

  const categories = computed<TaskCategory[]>(() => store.state.categories);
  const catalogs = computed<TaskCatalog[]>(() => store.state.catalogs);

  const loadCategories = async (filters: any, pageNumber: number, pageSize: number, includes: string[]) => {
    await store.dispatch('fetchCategories', { filters, pageNumber, pageSize, includes });
  };  

  const loadCatalogs = async (filters: any, pageNumber: number, pageSize: number, includes: string[]) => {
    await store.dispatch('fetchCatalogs', { filters, pageNumber, pageSize, includes });
  };

  return {
    categories,
    catalogs,
    loadCategories,
    loadCatalogs
  };
}

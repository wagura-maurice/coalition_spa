// src/stores/index.ts
import { createStore } from 'vuex';
import { getQueryString } from '@/utility/helper';
import api from '@/api/index';

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

const store = createStore<RootState>({
  state: {
    categories: [],
    catalogs: []
  },
  mutations: {
    setCategories(state, categories: TaskCategory[]) {
      state.categories = categories;
    },
    setCatalogs(state, catalogs: TaskCatalog[]) {
      state.catalogs = catalogs;
    }
  },
  actions: {
    async fetchCategories({ commit }, { filters, pageNumber, pageSize, includes }: { filters?: any, pageNumber?: number, pageSize?: number, includes?: string[] }) {
      try {
        let url = '/task/category';
        // Construct the URL with filters, pagination options, and included relationships if provided
        if (filters || pageNumber || pageSize || includes) {
          url += '?';
          if (filters) url += `${getQueryString(filters.filter)}`;
          if (pageNumber) url += `&page[number]=${pageNumber}`;
          if (pageSize) url += `&page[size]=${pageSize}`;
          if (includes) url += `&include=${includes.join(',')}`;
        }
        
        const response = await api.get<TaskCatalog[]>(url);
        commit('setCategories', response.data);
      } catch (error) {
        console.error('Error fetching catalogs:', error);
        throw error;
      }
    },    
    async fetchCatalogs({ commit }, { filters, pageNumber, pageSize, includes }: { filters?: any, pageNumber?: number, pageSize?: number, includes?: string[] }) {
      try {
        let url = '/task/catalog';
        
        // Construct the URL with filters, pagination options, and included relationships if provided
        if (filters || pageNumber || pageSize || includes) {
          url += '?';
          if (filters) url += `${getQueryString(filters)}`;
          if (pageNumber) url += `&page[number]=${pageNumber}`;
          if (pageSize) url += `&page[size]=${pageSize}`;
          if (includes) url += `&include=${includes.join(',')}`;
        }
        
        const response = await api.get<TaskCatalog[]>(url);
        commit('setCatalogs', response.data);
      } catch (error) {
        console.error('Error fetching catalogs:', error);
        throw error;
      }
    }
    
  },
  modules: {}
});

export default store;

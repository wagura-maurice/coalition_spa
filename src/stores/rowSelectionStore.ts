// src/stores/rowSelectionStore.ts
import { createStore } from 'vuex';

export const rowSelectionStore = createStore({
  state: {
    selectedRows: [],
    unselectedRows: [],
    selectAll: false,
  },
  mutations: {
    setSelectedRows(state, selectedRows) {
      state.selectedRows = selectedRows;
    },
    setUnselectedRows(state, unselectedRows) {
      state.unselectedRows = unselectedRows;
    },
    setSelectAll(state, selectAll) {
      state.selectAll = selectAll;
    }
  },
  actions: {
    saveSelectedRows(context, selectedRows) {
      context.commit('setSelectedRows', selectedRows);
    },
    loadSelectedRows(context) {
      // Access selectedRows directly from the state
      return context.state.selectedRows;
    },
    saveUnselectedRows(context, unselectedRows) {
      context.commit('setUnselectedRows', unselectedRows);
    },
    loadUnselectedRows(context) {
      // Access unselectedRows directly from the state
      return context.state.unselectedRows;
    },
    saveSelectAllState(context, selectAll) {
      context.commit('setSelectAll', selectAll);
    },
    loadSelectAllState(context) {
      // Access selectAll directly from the state
      return context.state.selectAll;
    }
  }
});

export default rowSelectionStore;

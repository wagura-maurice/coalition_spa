// src/types.d.ts
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

import Dexie, { EntityTable } from 'dexie';

export interface Widget {
  id: number;
  name: string;
  description: string | null;
  url: string | null;
  number: number | null;
  archived_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
}

const db = new Dexie('NextReactJsWidgetsPlaygroundDB') as Dexie & {
  widgets: EntityTable<
    Widget,
    'id' // primary key "id" (for the typings only)
  >;
};

db.version(1).stores({
  widgets:
    '++id, name, description, url, number, archived_at, created_at, updated_at',
});

export default db;

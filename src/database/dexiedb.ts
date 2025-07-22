import Dexie, { type Table } from 'dexie';
import type { Sale } from '../types';

export class AppDB extends Dexie {
  sales!: Table<Sale, number>;

  constructor() {
    super('pdv-db');
    this.version(1).stores({
      sales: '++id,items,total,date,status,coupon,discount,netTotal',
    });
  }
}

export const db = new AppDB();

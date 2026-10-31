import { UserProfile, PlacedOrder } from '../types';

/**
 * GreenLeavesDB - Ultra-Lightweight Client-Side Transactional Database
 * Built using native browser IndexedDB (W3C Standard).
 * Zero external dependencies, 0ms network latency, persistent object store.
 */

const DB_NAME = 'GreenLeavesOrganicDB_v1';
const DB_VERSION = 1;

export const DB_STORES = {
  USERS: 'users',
  ORDERS: 'orders',
  SESSION: 'session'
} as const;

// Open or initialize IndexedDB connection
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // 1. Users Object Store
      if (!db.objectStoreNames.contains(DB_STORES.USERS)) {
        const userStore = db.createObjectStore(DB_STORES.USERS, { keyPath: 'id' });
        userStore.createIndex('email', 'email', { unique: false });
        userStore.createIndex('phone', 'phone', { unique: false });
      }

      // 2. Orders Object Store
      if (!db.objectStoreNames.contains(DB_STORES.ORDERS)) {
        const orderStore = db.createObjectStore(DB_STORES.ORDERS, { keyPath: 'orderId' });
        orderStore.createIndex('createdAt', 'createdAt', { unique: false });
      }

      // 3. Current Session Store
      if (!db.objectStoreNames.contains(DB_STORES.SESSION)) {
        db.createObjectStore(DB_STORES.SESSION, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Generic helper to run a transactional operation
async function runTransaction<T>(
  storeName: string,
  mode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => IDBRequest | Promise<T>
): Promise<T> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);

    const request = callback(store) as IDBRequest;

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    tx.onabort = () => reject(tx.error);
  });
}

/**
 * High-Level Database APIs
 */
export const db = {
  // Users Store
  async saveUser(user: UserProfile): Promise<UserProfile> {
    try {
      await runTransaction(DB_STORES.USERS, 'readwrite', (store) => store.put(user));
    } catch {
      // Fallback: localStorage
      const users = JSON.parse(localStorage.getItem('green_leaves_users_backup') || '[]');
      const index = users.findIndex((u: UserProfile) => u.id === user.id);
      if (index >= 0) users[index] = user;
      else users.push(user);
      localStorage.setItem('green_leaves_users_backup', JSON.stringify(users));
    }
    return user;
  },

  async getAllUsers(): Promise<UserProfile[]> {
    try {
      const db = await openDatabase();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORES.USERS, 'readonly');
        const store = tx.objectStore(DB_STORES.USERS);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    } catch {
      return JSON.parse(localStorage.getItem('green_leaves_users_backup') || '[]');
    }
  },

  async findUserByIdentifier(identifier: string): Promise<UserProfile | null> {
    const clean = identifier.trim().toLowerCase();
    const users = await this.getAllUsers();
    return users.find(u => 
      (u.email && u.email.toLowerCase() === clean) ||
      (u.phone && u.phone.replace(/\D/g, '') === clean.replace(/\D/g, ''))
    ) || null;
  },

  // Orders Store
  async saveOrder(order: PlacedOrder): Promise<PlacedOrder> {
    try {
      await runTransaction(DB_STORES.ORDERS, 'readwrite', (store) => store.put(order));
    } catch {
      const orders = JSON.parse(localStorage.getItem('green_leaves_orders_backup') || '[]');
      orders.unshift(order);
      localStorage.setItem('green_leaves_orders_backup', JSON.stringify(orders));
    }
    return order;
  },

  async getAllOrders(): Promise<PlacedOrder[]> {
    try {
      const db = await openDatabase();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORES.ORDERS, 'readonly');
        const store = tx.objectStore(DB_STORES.ORDERS);
        const req = store.getAll();
        req.onsuccess = () => {
          const list = (req.result || []) as PlacedOrder[];
          // Sort newest first
          list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          resolve(list);
        };
        req.onerror = () => reject(req.error);
      });
    } catch {
      return JSON.parse(localStorage.getItem('green_leaves_orders_backup') || '[]');
    }
  },

  // Session Store (Current logged in user)
  async setCurrentSession(user: UserProfile | null): Promise<void> {
    try {
      if (user) {
        await runTransaction(DB_STORES.SESSION, 'readwrite', (store) => 
          store.put({ key: 'active_user', data: user })
        );
      } else {
        await runTransaction(DB_STORES.SESSION, 'readwrite', (store) => 
          store.delete('active_user')
        );
      }
    } catch {
      // localStorage is also maintained in AuthContext
    }
  },

  async getCurrentSession(): Promise<UserProfile | null> {
    try {
      const result = await runTransaction<{ key: string; data: UserProfile } | undefined>(
        DB_STORES.SESSION, 
        'readonly', 
        (store) => store.get('active_user')
      );
      return result?.data || null;
    } catch {
      return null;
    }
  }
};

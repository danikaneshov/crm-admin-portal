

export const db = {};
export const auth = {
  onAuthStateChanged: (cb) => {
    cb({ uid: 'mock_demo_user' });
    return () => {};
  }
};
export const signOut = async () => {};

// Initial Mock Data
const state = {
  outlets: {
    'demo_outlet_1': { ownerUid: 'mock_demo_user', slug: 'demo', name: 'Демо Lounge', address: 'ул. Абая 10', settings: { baseSalary: 3000, partnerBaseSalary: 1500, itemCommission: 1500, partnerItemCommission: 1500 } }
  },
  employees: {
    'emp_1': { outletId: 'demo_outlet_1', name: 'Алихан', pin: '1111', createdAt: { seconds: Date.now()/1000 - 86400 } },
    'emp_2': { outletId: 'demo_outlet_1', name: 'Марат', pin: '2222', createdAt: { seconds: Date.now()/1000 - 172800 } }
  },
  sales: {},
  settings: {
    'profits': {},
    'inventory_standards': {}
  },
  inventory_movements: {},
  inventory_templates: {
    'inv_1': { outletId: 'demo_outlet_1', name: 'Musthave', measure: 'грамм', unitCost: 35 }
  }
};

// Generate some fake sales
for (let i = 0; i < 15; i++) {
  const d = new Date();
  d.setDate(d.getDate() - i);
  const dateStr = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
  const hookahs = Math.floor(Math.random() * 20) + 10;
  const id = `sale_${i}`;
  state.sales[id] = {
    outletId: 'demo_outlet_1',
    employeeId: i % 2 === 0 ? 'emp_1' : 'emp_2',
    dateStr,
    totalItems: hookahs,
    earned: hookahs * 1500 + 3000,
    status: 'closed',
    endTime: { seconds: d.getTime() / 1000 }
  };
}

const listeners = [];
const notify = () => {
  listeners.forEach(l => l());
};

export const collection = (db, path) => path;
export const doc = (db, path, id) => `${path}/${id}`;
export const serverTimestamp = () => ({ seconds: Date.now() / 1000 });
export const deleteField = () => undefined;

export const query = (path, ...conditions) => ({ path, conditions });
export const where = (field, op, val) => ({ field, op, val });
export const orderBy = (field, dir) => ({ field, dir, isOrderBy: true });

export const getDocs = async (q) => {
  const path = typeof q === 'string' ? q : q.path;
  const collectionData = state[path] || {};
  let docs = Object.entries(collectionData).map(([id, data]) => ({ id, data: () => data, exists: () => true }));
  
  if (q.conditions) {
    q.conditions.forEach(cond => {
      if (cond.isOrderBy) return; // Skip sorting in mock
      docs = docs.filter(d => d.data()[cond.field] === cond.val);
    });
  }
  return { docs, empty: docs.length === 0 };
};

export const onSnapshot = (queryOrDoc, callback) => {
  const runCallback = () => {
    if (typeof queryOrDoc === 'string' && queryOrDoc.includes('/')) {
      // It's a doc reference
      const [col, id] = queryOrDoc.split('/');
      const data = state[col]?.[id];
      callback({ exists: () => !!data, data: () => data, id });
    } else {
      // It's a query or collection
      getDocs(queryOrDoc).then(callback);
    }
  };
  
  listeners.push(runCallback);
  runCallback(); // initial call
  
  return () => {
    const idx = listeners.indexOf(runCallback);
    if (idx > -1) listeners.splice(idx, 1);
  };
};

export const addDoc = async (path, data) => {
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
  if (!state[path]) state[path] = {};
  state[path][id] = data;
  notify();
  return { id };
};

export const updateDoc = async (docRef, data) => {
  const [col, id] = docRef.split('/');
  if (state[col]?.[id]) {
    // Basic nested update support for 'settings.baseSalary' etc
    Object.keys(data).forEach(key => {
      if (key.includes('.')) {
        const [k1, k2] = key.split('.');
        if (!state[col][id][k1]) state[col][id][k1] = {};
        if (data[key] === undefined) delete state[col][id][k1][k2];
        else state[col][id][k1][k2] = data[key];
      } else {
        if (data[key] === undefined) delete state[col][id][key];
        else state[col][id][key] = data[key];
      }
    });
    notify();
  }
};

export const deleteDoc = async (docRef) => {
  const [col, id] = docRef.split('/');
  if (state[col]?.[id]) {
    delete state[col][id];
    notify();
  }
};

export const setDoc = async (docRef, data, options) => {
  const [col, id] = docRef.split('/');
  if (!state[col]) state[col] = {};
  if (options?.merge) {
    state[col][id] = { ...state[col][id], ...data };
  } else {
    state[col][id] = data;
  }
  notify();
};

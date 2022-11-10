import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { sync } from 'vuex-router-sync';
import auth from './auth';
import router from '../router';

/**
 * Disable persisted state when in embed mode!
 */
const vuexLocal = createPersistedState({
  paths: [
    'auth.userInfo',
    'auth.isAuthenticated',
  ],

  getState: (key, storage) => {
    const state = JSON.parse(storage.getItem(key)) || {};
    return state;
  },

  setState: (key, state, storage) => {
    storage.setItem(key, JSON.stringify({
      ...state,
    }));
  },
});

const store = new Vuex.Store({
  modules: {
    auth,
  },
  plugins: [vuexLocal],
});
sync(store, router, { moduleName: 'routeModule' });
export default store;

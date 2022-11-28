import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { sync } from 'vuex-router-sync';
import auth from './auth';
import student from './student';
import lecturer from './lecturer';
import admin from './admin';
import url from './url';
import router from '../router';

/**
 * Disable persisted state when in embed mode!
 */
const vuexLocal = createPersistedState({
  paths: [
    'auth.userInfo',
    'auth.isAuthenticated',
    'auth',
    'url.page',
    'url.module',
    'url.section',
    'url.id',
    'student',
    'student.listStudents',
    'lecturer',
    'lecturer.listLecturer',
    'admin',
    'admin.listAdmins',
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
  storage: window.sessionStorage,
});

const store = new Vuex.Store({
  modules: {
    auth, student, url, lecturer, admin,
  },
  plugins: [vuexLocal],
});
sync(store, router, { moduleName: 'routeModule' });
export default store;

/* eslint-disable camelcase */
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import io from 'socket.io-client';
import { sync } from 'vuex-router-sync';
import auth from './auth';
import student from './student';
import lecturer from './lecturer';
import admin from './admin';
import url from './url';
import topic from './topic';
import schedule from './schedule';
import router from '../router';
import topic_proposal from './topic_proposal';
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
    'topic',
    'topic.listTopics',
    'schedule',
    'schedule.listSchedules',
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

const createWebSocketPlugin = (socket) => (store) => {
  store.$socket = socket;
  // socket.on('connect', () => {
  //   socket.emit('login', null);
  // });

  socket.on('notify', (notify) => {
    console.log('🚀 ~ file: index.js:59 ~ socket.on ~ notify: ', notify);
    // TODO: re-render notification
  });
};

const socket = io('http://localhost:5000');

const websocketPlugin = createWebSocketPlugin(socket);

const store = new Vuex.Store({
  modules: {
    auth, student, url, lecturer, admin, topic, schedule, topic_proposal,
  },
  plugins: [vuexLocal, websocketPlugin],
});
sync(store, router, { moduleName: 'routeModule' });
export default store;

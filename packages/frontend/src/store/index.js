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
import task from './task';
import router from '../router';
import topic_proposal from './topic_proposal';
import notification from './notification';
import committee from './committee';
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
    'url.subModule',
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
    'schedule.listScheduleToday',
    'schedule.isPermit',
    'schedule.isScheduleProposal',
    'task.isScheduleRegister',
    'task.isScheduleApprove',
    'task.listTopic',
    'task.topicId',
    'task.listTask',
    'task.listMember',
    'task.listStudents',
    'topic_proposal.listTopicProposalCreated',
    'topic_proposal.listTopicProposalByLecturer',
    'topic_proposal.listTopicProposalAdmin',
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
  socket.on('connect', () => {
    const { _id } = store.state.auth.userInfo;
    if (_id) { socket.emit('login', _id); }
  });

  socket.on('notify', async () => {
    const { token } = store.state.auth.userInfo;
    if (token) {
      await store.dispatch('notification/fetchListNotifications', token);
    }
  });

  socket.on('task', async (data) => {
    const { topicId } = store.state.task;
    const { token } = store.state.auth.userInfo;
    if (topicId === data) {
      await store.dispatch('task/fetchAllTask', { token, topicId });
    }
  });
};

const socket = io('http://localhost:5000');

const websocketPlugin = createWebSocketPlugin(socket);

const store = new Vuex.Store({
  modules: {
    auth,
    student,
    url,
    lecturer,
    admin,
    topic,
    schedule,
    topic_proposal,
    notification,
    task,
    committee,
  },
  plugins: [vuexLocal, websocketPlugin],
});
sync(store, router, { moduleName: 'routeModule' });
export default store;

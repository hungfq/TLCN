import { signInWithGoogle } from '../utils/api/auth';
import UserApi from '../utils/api/user';

const emptyCalendar = {
  _id: null,
  topicId: null,
  description: null,
  start_time: null,
  end_time: null,
  comment: null,
};

const initState = {
  currentCalendar: emptyCalendar,
  listCalendars: [],
};

const getters = {
  current: (state) => state.currentCalendar,
  listCalendars: (state) => state.listCalendars,
};

const actions = {
  async fetchCurrentCalendar ({ commit, dispatch, rootState }, topicId) {
    try {
      // get topic by calendar
    } catch (e) {
      console.log(e);
      // handle ui display error in UI
      console.log('Error in login');
    }
  },
  async registerCalenderInTopic ({ commit, dispatch, rootState }, topicId) {
    try {
      // get topic by calendar
    } catch (e) {
      console.log(e);
      // handle ui display error in UI
      console.log('Error in login');
    }
  },
};

const mutations = {
  setAuthenticated: (state, userInfo) => {
    state.userInfo = userInfo;
    state.isAuthenticated = true;
  },
  setUserInfo: (state, userInfo) => {
    state.userInfo.name = userInfo.name;
    state.userInfo.sex = userInfo.sex;
    state.userInfo.code = userInfo.code;
    state.isAuthenticated = true;
  },
  unsetAuthenticated: (state) => {
    state.userInfo = emptyCalendar;
    state.isAuthenticated = false;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

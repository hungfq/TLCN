import ScheduleApi from '../utils/api/schedule';

const initState = {
  listSchedules: [],
  listScheduleToday: [],
};

const getters = {
  listSchedules: (state) => state.listSchedules,
  listScheduleToday: (state) => state.listScheduleToday,
};

const actions = {
  async fetchListSchedules ({ commit }, token) {
    try {
      const listSchedules = await ScheduleApi.listAllSchedule(token);
      commit('setListSchedules', listSchedules);
    } catch (e) {
      console.log(e.message);
    }
  },
  async fetchListScheduleToday ({ commit }, token) {
    try {
      const listSchedules = await ScheduleApi.listScheduleToday(token);
      commit('setListScheduleToday', listSchedules);
    } catch (e) {
      console.log(e.message);
    }
  },

  async addSchedule ({ dispatch, commit }, payload) {
    try {
      const { token, value } = payload;
      await ScheduleApi.addSchedule(token, value);
      dispatch('fetchListSchedules', token);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateSchedule ({ dispatch, commit }, payload) {
    const { token, value } = payload;
    await ScheduleApi.updateSchedule(token, value);
    dispatch('fetchListSchedules', token);
  },
  async removeSchedule ({ dispatch, commit }, value) {
    const { token, id } = value;
    await ScheduleApi.removeSchedule(token, id);
    dispatch('fetchListSchedules', token);
  },
};

const mutations = {
  setListSchedules: (state, listSchedules) => {
    state.listSchedules = listSchedules;
  },
  setListScheduleToday: (state, listScheduleToday) => {
    state.listScheduleToday = listScheduleToday;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

import ScheduleApi from '../utils/api/schedule';

const initState = {
  listSchedules: [],
  listScheduleProposalStudent: [],
  listScheduleRegisterStudent: [],
  listScheduleApproveLecturer: [],
  isPermit: false,
  isScheduleProposal: false,
  isScheduleRegister: false,
  isScheduleApprove: false,
  currentScheduleId: null,
  listStudentsOfSchedule: [],
};

const getters = {
  listSchedules: (state) => state.listSchedules,
  listScheduleRegisterStudent: (state) => state.listScheduleRegisterStudent,
  listScheduleProposalStudent: (state) => state.listScheduleProposalStudent,
  listScheduleApproveLecturer: (state) => state.listScheduleApproveLecturer,
  isPermit: (state) => state.isPermit,
  isScheduleProposal: (state) => state.isScheduleProposal,
  isScheduleRegister: (state) => state.isScheduleRegister,
  isScheduleApprove: (state) => state.isScheduleApprove,
  currentScheduleId: (state) => state.currentScheduleId,
  listStudentsOfSchedule: (state) => state.listStudentsOfSchedule,
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
  async fetchListScheduleApproveLecturer ({ commit }, token) {
    try {
      const listSchedules = await ScheduleApi.listScheduleApproveLecturer(token);
      commit('setListScheduleApproveLecturer', listSchedules);
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
    await dispatch('fetchListSchedules', token);
  },
  async importTopic ({ dispatch }, payload) {
    try {
      const { token, id, xlsx } = payload;
      const data = await ScheduleApi.importTopic(token, id, xlsx);
      await dispatch('fetchListSchedules', token);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async importStudent ({ dispatch }, payload) {
    try {
      const { token, id, xlsx } = payload;
      const data = await ScheduleApi.importStudent(token, id, xlsx);
      await dispatch('fetchListSchedules', token);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async fetchStudentsOfSchedule ({ commit }, payload) {
    try {
      const { token, id } = payload;
      const data = await ScheduleApi.fetchStudentsOfSchedule(token, id);
      commit('setListStudentsOfSchedule', data);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async exportExcel ({ }, payload) {
    try {
      const { token, id } = payload;
      const data = await ScheduleApi.exportExcel(token, id);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

const mutations = {
  setListSchedules: (state, listSchedules) => {
    state.listSchedules = listSchedules;
  },
  setListScheduleApproveLecturer: (state, listScheduleApproveLecturer) => {
    state.listScheduleApproveLecturer = listScheduleApproveLecturer;
  },
  setListScheduleToday: (state, listScheduleToday) => {
    state.listScheduleProposalStudent = listScheduleToday.proposal;
    state.listScheduleRegisterStudent = listScheduleToday.register;
  },
  setIsScheduleProposal: (state, value) => {
    state.isScheduleProposal = value;
  },
  setIsScheduleRegister: (state, value) => {
    state.isScheduleRegister = value;
  },
  setIsScheduleApprove: (state, value) => {
    state.isScheduleApprove = value;
  },
  setIsPermit: (state, value) => {
    state.isPermit = value;
  },
  setCurrentScheduleId: (state, value) => {
    state.currentScheduleId = value;
  },
  setListStudentsOfSchedule: (state, value) => {
    state.listStudentsOfSchedule = value;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

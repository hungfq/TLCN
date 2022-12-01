import ScheduleApi from '../utils/api/schedule';

const initState = {
  listSchedules: [],
};

const getters = {
  listSchedules: (state) => state.listSchedules,
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

  // async addStudent ({ dispatch, commit }, payload) {
  //   try {
  //     const { token, value } = payload;
  //     await StudentApi.addStudent(token, value);
  //     dispatch('fetchListStudent', token);
  //   } catch (e) {
  //     throw new Error(e.message);
  //   }
  // },
  // async updateStudent ({ dispatch, commit }, payload) {
  //   const { token, value } = payload;
  //   await StudentApi.updateStudent(token, value);
  //   dispatch('fetchListStudent', token);
  // },
  // async removeStudent ({ commit }, value) {
  //   const { token, id } = value;
  //   const listStudents = await StudentApi.listAllStudent(token);
  //   commit('setListStudent', listStudents);
  // },
};

const mutations = {
  setListSchedules: (state, listSchedules) => {
    state.listSchedules = listSchedules;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

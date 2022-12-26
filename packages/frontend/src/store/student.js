import StudentApi from '../utils/api/student';

const initState = {
  listStudents: [],
  student: null,
};

const getters = {
  studentId: (state) => state.student._id,
  studentEmail: (state) => state.student.email,
  student: (state) => state.student,
  listStudents: (state) => state.listStudents,
};

const actions = {
  async fetchListStudent ({ commit }, token) {
    const listStudents = await StudentApi.listAllStudent(token);
    commit('setListStudent', listStudents);
  },

  async addStudent ({ dispatch, commit }, payload) {
    try {
      const { token, value } = payload;
      await StudentApi.addStudent(token, value);
      dispatch('fetchListStudent', token);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateStudent ({ dispatch, commit }, payload) {
    const { token, value } = payload;
    await StudentApi.updateStudent(token, value);
    dispatch('fetchListStudent', token);
  },
  async removeStudent ({ commit }, value) {
    const { token, id } = value;
    const listStudents = await StudentApi.listAllStudent(token);
    commit('setListStudent', listStudents);
  },
  async importStudent ({ dispatch }, payload) {
    try {
      const { token, xlsx } = payload;
      const data = await StudentApi.importStudent(token, xlsx);
      await dispatch('fetchListStudent', token);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

const mutations = {
  setListStudent: (state, listStudent) => {
    state.listStudents = listStudent;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

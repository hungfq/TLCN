import LectureApi from '../utils/api/lecturer';

const initState = {
  listLecturer: [],
  lecturer: null,
};

const getters = {
  lecturerId: (state) => state.lecturer._id,
  lecturerEmail: (state) => state.lecturer.email,
  lecturer: (state) => state.lecturer,
  listLecturer: (state) => state.listLecturer,
};

const actions = {
  async fetchListLecturer ({ commit }, token) {
    const listLecturer = await LectureApi.listAllLecturer(token);
    commit('setListLecturer', listLecturer);
  },

  async addLecturer ({ dispatch, commit }, payload) {
    try {
      const { token, value } = payload;
      await LectureApi.addLecturer(token, value);
      dispatch('fetchListLecturer', token);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateLecturer ({ dispatch, commit }, payload) {
    const { token, value } = payload;
    await LectureApi.updateLecturer(token, value);
    dispatch('fetchListLecturer', token);
  },
  async importLecturer ({ dispatch }, payload) {
    try {
      const { token, xlsx } = payload;
      const data = await LectureApi.importLecturer(token, xlsx);
      await dispatch('fetchListLecturer', token);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

const mutations = {
  setListLecturer: (state, listLecturer) => {
    state.listLecturer = listLecturer;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

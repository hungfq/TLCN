import TopicApi from '../utils/api/topic';

const initState = {
  listTopics: [],
};

const getters = {
  listTopics: (state) => state.listTopics,
};

const actions = {
  async fetchListTopics ({ commit }, token) {
    const listTopics = await TopicApi.listAllTopics(token);
    commit('setListTopics', listTopics);
  },

  // async addTopics ({ dispatch, commit }, payload) {
  //   try {
  //     const { token, value } = payload;
  //     await TopicApi.addStudent(token, value);
  //     dispatch('setListTopics', token);
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
  setListTopics: (state, listTopics) => {
    state.listTopics = listTopics;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

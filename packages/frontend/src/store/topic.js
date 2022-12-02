import TopicApi from '../utils/api/topic';

const initState = {
  listTopics: [],
  listTopicByLecturer: [],
};

const getters = {
  listTopics: (state) => state.listTopics,
};

const actions = {
  async fetchListTopics ({ commit }, token) {
    const listTopics = await TopicApi.listAllTopics(token);
    commit('setListTopics', listTopics);
  },
  async fetchListTopicByLectures ({ commit }, value) {
    const { token, lecturerId } = value;
    const listTopics = await TopicApi.listAllTopicsByLecturerId(token, lecturerId);
    commit('setListTopicsByLecturer', listTopics);
  },

  async addTopic ({ dispatch }, payload) {
    try {
      const { token, value } = payload;
      await TopicApi.createTopic(token, value);
      dispatch('fetchListTopics', token);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateTopic ({ dispatch, commit }, payload) {
    try {
      const { token, value } = payload;
      await TopicApi.updateTopicById(token, value);
      dispatch('fetchListTopics', token);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async removeTopic ({ dispatch, commit }, value) {
    const { token, id } = value;
    await TopicApi.deleteTopicById(token, id);
    dispatch('fetchListTopics', token);
  },
};

const mutations = {
  setListTopics: (state, listTopics) => {
    state.listTopics = listTopics;
  },
  setListTopicsByLecturer: (state, listTopicByLecturer) => {
    state.listTopicByLecturer = listTopicByLecturer;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

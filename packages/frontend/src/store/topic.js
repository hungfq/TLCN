import TopicApi from '../utils/api/topic';

const initState = {
  listTopics: [],
  listTopicByLecturer: [],
  listTopicByStudent: [],
  topicResult: null,
  listTopicPermitRegister: [],
};

const getters = {
  listTopics: (state) => state.listTopics,
  listTopicByStudent: (state) => state.listTopicByStudent,
  listTopicPermitRegister: (state) => state.listTopicPermitRegister,
};

const actions = {
  async fetchListTopics ({ commit }, token) {
    const listTopics = await TopicApi.listAllTopics(token);
    commit('setListTopics', listTopics);
  },
  async fetchListTopicByStudent ({ commit }, token) {
    const listTopics = await TopicApi.listAllTopics(token);
    commit('setListTopicsByStudent', listTopics);
  },
  async fetchListTopicByLectures ({ commit }, value) {
    const { token, lecturerId } = value;
    const listTopics = await TopicApi.listAllTopicsByLecturerId(token, lecturerId);
    commit('setListTopicsByLecturer', listTopics);
  },

  async fetchTopicResult ({ commit }, token) {
    const topic = await TopicApi.getResultRegister(token);
    commit('setTopicResult', topic);
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
  async addRegisterTopic ({ dispatch, commit }, value) {
    const { token, id } = value;
    await TopicApi.addRegisterTopic(token, id);
    dispatch('fetchListTopicByStudent', token);
  },

  async removeRegisterTopicStudent ({ dispatch, commit }, value) {
    const { token, id } = value;
    await TopicApi.removeRegisterTopicStudent(token, id);
    dispatch('fetchTopicResult', token);
    dispatch('fetchListTopicByStudent', token);
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
  setListTopicsByStudent: (state, listTopicByStudent) => {
    state.listTopicByStudent = listTopicByStudent;
  },
  setTopicResult: (state, topicResult) => {
    state.topicResult = topicResult;
  },
  setListTopicRegister: (state, listTopicPermitRegister) => {
    state.listTopicPermitRegister = listTopicPermitRegister;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

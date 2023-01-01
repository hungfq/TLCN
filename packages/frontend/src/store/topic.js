import TopicApi from '../utils/api/topic';

const initState = {
  listTopics: [],
  listTopicByLecturer: [],
  topic: null,
  listTopicsByLecturerSchedule: [],
  listTopicByStudent: [],
  topicResult: null,
  listTopicPermitRegister: [],
  topicScheduleId: null,
  listTopicByScheduleStudent: [],
};

const getters = {
  listTopics: (state) => state.listTopics,
  topic: (state) => state.topic,
  listTopicByStudent: (state) => state.listTopicByStudent,
  listTopicPermitRegister: (state) => state.listTopicPermitRegister,
  listTopicsByLecturerSchedule: (state) => state.listTopicsByLecturerSchedule,
  topicScheduleId: (state) => state.topicScheduleId,
  listTopicByScheduleStudent: (state) => state.listTopicByScheduleStudent,
  topicResult: (state) => state.topicResult,
};

const actions = {
  async fetchListTopics ({ commit }, token) {
    const listTopics = await TopicApi.listAllTopics(token);
    commit('setListTopics', listTopics);
  },
  async fetchTopicById ({ commit }, value) {
    const { token, topicId } = value;
    const topic = await TopicApi.getTopic(token, topicId);
    commit('setTopic', topic);
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
  async fetchListTopicByLecturerSchedule ({ commit }, value) {
    const { token, lecturerId, scheduleId } = value;
    const listTopics = await TopicApi.listAllTopicsByLecturerIdAndScheduleId(token, lecturerId, scheduleId);
    commit('setListTopicsByLecturerSchedule', listTopics);
  },

  async fetchListTopicBySchedule ({ commit }, value) {
    const { token, scheduleId } = value;
    const listTopics = await TopicApi.listAllTopicsByScheduleId(token, scheduleId);
    commit('setListTopicByScheduleStudent', listTopics);
  },

  async fetchTopicResult ({ commit }, token) {
    const topic = await TopicApi.getResultRegister(token);
    commit('setTopicResult', topic);
  },

  async addTopic ({ dispatch }, payload) {
    try {
      const { token, value } = payload;
      await TopicApi.createTopic(token, value);
      await dispatch('fetchListTopics', token);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateTopic ({ dispatch, commit }, payload) {
    try {
      const { token, value } = payload;
      await TopicApi.updateTopicById(token, value);
      await dispatch('fetchListTopics', token);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async removeTopic ({ dispatch, commit }, value) {
    const { token, id } = value;
    await TopicApi.deleteTopicById(token, id);
    await dispatch('fetchListTopics', token);
  },
  async addRegisterTopic ({ dispatch, commit }, value) {
    const { token, id } = value;
    await TopicApi.addRegisterTopic(token, id);
    await dispatch('fetchListTopicByStudent', token);
  },
  async addRegisterTopicNew ({ dispatch, commit }, value) {
    const { token, id } = value;
    await TopicApi.addRegisterTopicNew(token, id);
    await dispatch('fetchListTopicByStudent', token);
  },

  async removeRegisterTopicStudent ({ dispatch, commit }, value) {
    const { token, id } = value;
    await TopicApi.removeRegisterTopicStudent(token, id);
    await dispatch('fetchTopicResult', token);
    await dispatch('fetchListTopicByStudent', token);
    await dispatch('fetchListTopics', token);
  },
  async importTopic ({ dispatch }, payload) {
    try {
      const { token, xlsx } = payload;
      const data = await TopicApi.importTopic(token, xlsx);
      await dispatch('fetchListTopics', token);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

const mutations = {
  setListTopics: (state, listTopics) => {
    state.listTopics = listTopics;
  },
  setTopic: (state, topic) => {
    state.topic = topic;
  },
  setListTopicsByLecturer: (state, listTopicByLecturer) => {
    state.listTopicByLecturer = listTopicByLecturer;
  },
  setListTopicsByLecturerSchedule: (state, listTopicsByLecturerSchedule) => {
    state.listTopicsByLecturerSchedule = listTopicsByLecturerSchedule;
  },
  setTopicScheduleId: (state, topicScheduleId) => {
    state.topicScheduleId = topicScheduleId;
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
  setListTopicByScheduleStudent: (state, listTopicByScheduleStudent) => {
    state.listTopicByScheduleStudent = listTopicByScheduleStudent;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

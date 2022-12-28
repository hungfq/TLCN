import TopicProposalApi from '../utils/api/topic_proposal';

const initState = {
  listTopics: [],
  listTopicProposalByLecturer: [],
  listTopicProposalCreated: [],
  listTopicProposalAdmin: [],
  topicScheduleId: '',
};

const getters = {
  listTopicProposalByLecturer: (state) => state.listTopicProposalByLecturer,
  listTopicProposalCreated: (state) => state.listTopicProposalCreated,
  listTopicProposalAdmin: (state) => state.listTopicProposalAdmin,
  topicScheduleId: (state) => state.topicScheduleId,
};

const actions = {
  async fetchListTopicProposalByLectures ({ commit }, payload) {
    const { token, scheduleId } = payload;
    const listTopics = await TopicProposalApi.listAllTopicsByLecturer(token, scheduleId);
    commit('setListTopicProposalByLecturer', listTopics);
  },

  async fetchListTopicProposalCreated ({ commit }, payload) {
    const { token, scheduleId } = payload;
    const listTopics = await TopicProposalApi.listAllTopicsByCreated(token, scheduleId);
    commit('setListTopicProposalCreated', listTopics);
  },

  async fetchListTopicProposalAdmin ({ commit }, token) {
    const listTopics = await TopicProposalApi.listAllTopicsByAdmin(token);
    commit('setListTopicProposalAdmin', listTopics);
  },

  async addTopicProposal ({ dispatch, state }, payload) {
    const { token, value } = payload;
    await TopicProposalApi.addTopicProposal(token, value);
    await dispatch('fetchListTopicProposalCreated', { token, scheduleId: state.topicScheduleId });
  },

  async updateTopicProposal ({ dispatch, state }, payload) {
    const { token, value } = payload;
    await TopicProposalApi.updateTopicProposal(token, value);
    await dispatch('fetchListTopicProposalCreated', { token, scheduleId: state.topicScheduleId });
  },
  async removeTopicProposal ({ dispatch, state }, payload) {
    const { token, id } = payload;
    await TopicProposalApi.removeTopicProposal(token, id);
    await dispatch('fetchListTopicProposalCreated', { token, scheduleId: state.topicScheduleId });
    await dispatch('fetchListTopicProposalAdmin', token);
  },
  async declineTopicProposal ({ dispatch, state }, payload) {
    const { token, id } = payload;
    await TopicProposalApi.declineTopicProposal(token, id);
    await dispatch('fetchListTopicProposalCreated', { token, scheduleId: state.topicScheduleId });
    await dispatch('fetchListTopicProposalAdmin', token);
  },
  async approveTopicProposalByLecturer ({ dispatch }, payload) {
    const { token, id, scheduleId } = payload;
    await TopicProposalApi.approveTopicProposalByLecturer(token, id);
    await dispatch('fetchListTopicProposalByLectures', { token, scheduleId });
  },
  async approveTopicProposalByAdmin ({ dispatch }, payload) {
    const { token, value } = payload;
    await TopicProposalApi.approveTopicProposalByAdmin(token, value);
    await dispatch('fetchListTopicProposalAdmin', token);
  },
};

const mutations = {
  setListTopics: (state, listTopics) => {
    state.listTopics = listTopics;
  },
  setListTopicProposalByLecturer: (state, listTopicProposalByLecturer) => {
    state.listTopicProposalByLecturer = listTopicProposalByLecturer;
  },
  setListTopicProposalCreated: (state, listTopicProposalCreated) => {
    state.listTopicProposalCreated = listTopicProposalCreated;
  },
  setListTopicProposalAdmin: (state, listTopicProposalAdmin) => {
    state.listTopicProposalAdmin = listTopicProposalAdmin;
  },
  setTopicScheduleId: (state, topicScheduleId) => {
    state.topicScheduleId = topicScheduleId;
  },

};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

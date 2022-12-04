import TopicProposalApi from '../utils/api/topic_proposal';

const initState = {
  listTopics: [],
  listTopicProposalByLecturer: [],
  listTopicProposalCreated: [],
};

const getters = {
  listTopicProposalByLecturer: (state) => state.listTopicProposalByLecturer,
  listTopicProposalCreated: (state) => state.listTopicProposalCreated,
};

const actions = {
  async fetchListTopicProposalByLectures ({ commit }, token) {
    const listTopics = await TopicProposalApi.listAllTopicsByLecturer(token);
    commit('setListTopicProposalByLecturer', listTopics);
  },
  async fetchListTopicProposalCreated ({ commit }, token) {
    const listTopics = await TopicProposalApi.listAllTopicsByCreated(token);
    commit('setListTopicProposalCreated', listTopics);
  },

  async addTopicProposal ({ dispatch }, payload) {
    const { token, value } = payload;
    await TopicProposalApi.addTopicProposal(token, value);
    dispatch('fetchListTopicProposalCreated', token);
  },

  async updateTopicProposal ({ dispatch }, payload) {
    const { token, value } = payload;
    await TopicProposalApi.updateTopicProposal(token, value);
    dispatch('fetchListTopicProposalCreated', token);
  },
  async removeTopicProposal ({ dispatch }, payload) {
    const { token, id } = payload;
    await TopicProposalApi.removeTopicProposal(token, id);
    dispatch('fetchListTopicProposalCreated', token);
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

};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

import CommitteeApi from '../utils/api/committee';

const initState = {
  listCommittee: [],
  lecturer: null,
};

const getters = {
  listCommittee: (state) => state.listCommittee,
};

const actions = {
  async fetchListCommittee ({ commit }, token) {
    const listCommittee = await CommitteeApi.listAllCommittee(token);
    commit('setListCommittee', listCommittee);
  },
  async addCommittee ({ dispatch }, payload) {
    const { token, value } = payload;
    await CommitteeApi.addCommittee(token, value);
    await dispatch('fetchListCommittee', token);
  },
  async updateCommittee ({ dispatch }, payload) {
    const { token, value } = payload;
    const { id } = value;
    await CommitteeApi.updateCommittee(token, id, value);
    await dispatch('fetchListCommittee', token);
  },
  async deleteCommittee ({ dispatch }, payload) {
    const { token, id } = payload;
    await CommitteeApi.deleteCommittee(token, id);
    await dispatch('fetchListCommittee', token);
  },
  async importCommittee ({ dispatch }, payload) {
    try {
      const { token, xlsx } = payload;
      const data = await CommitteeApi.importCommittee(token, xlsx);
      await dispatch('fetchListCommittee', token);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

const mutations = {
  setListCommittee: (state, listCommittee) => {
    state.listCommittee = listCommittee;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

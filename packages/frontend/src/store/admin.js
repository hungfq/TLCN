import AdminApi from '../utils/api/admin';

const initState = {
  listAdmins: [],
  admin: null,
};

const getters = {
  adminId: (state) => state.admin._id,
  adminEmail: (state) => state.admin.email,
  admin: (state) => state.admin,
  listAdmins: (state) => state.listAdmins,
};

const actions = {
  async fetchListAdmins ({ commit }, token) {
    const listAdmins = await AdminApi.listAllAdmin(token);
    commit('setListAdmins', listAdmins);
  },

  async addAdmin ({ dispatch, commit }, payload) {
    try {
      const { token, value } = payload;
      await AdminApi.addAdmin(token, value);
      dispatch('fetchListAdmins', token);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateAdmin ({ dispatch, commit }, payload) {
    const { token, value } = payload;
    await AdminApi.updateAdmin(token, value);
    dispatch('fetchListAdmins', token);
  },
};

const mutations = {
  setListAdmins: (state, listAdmins) => {
    state.listAdmins = listAdmins;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

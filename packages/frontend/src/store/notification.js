import NotificationApi from '../utils/api/notification';

const initState = {
  listNotifications: [],
};

const getters = {
  listNotifications: (state) => state.listNotifications,
};

const actions = {
  async fetchListNotifications ({ commit }, token) {
    try {
      const listNotifications = await NotificationApi.listAllNotification(token);
      commit('setListNotifications', listNotifications);
    } catch (e) {
      console.log('🚀 ~ file: notification.js:17 ~ fetchListNotifications ~ e', e);
    }
  },

  async readNotification ({ dispatch }, payload) {
    const { token, id } = payload;
    await NotificationApi.readNotification(token, id);
    await dispatch('fetchListNotifications', token);
  },

  async deleteNotification ({ dispatch }, payload) {
    const { token, id } = payload;
    await NotificationApi.deleteNotification(token, id);
    await dispatch('fetchListNotifications', token);
  },

};

const mutations = {
  setListNotifications: (state, listNotifications) => {
    state.listNotifications = listNotifications;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

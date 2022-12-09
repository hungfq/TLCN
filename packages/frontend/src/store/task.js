import ScheduleApi from '../utils/api/schedule';

const initState = {
  listScheduleTopic: [],
  listTopic: [],
};

const getters = {
  listScheduleTopic: (state) => state.listScheduleTopic,
  listTopic: (state) => state.listTopic,
};

const actions = {
  async fetchScheduleTopic ({ commit }, token) {
    try {
      const listScheduleTopic = await ScheduleApi.lecturerListScheduleTopicShort(token);
      commit('setListSchedules', listScheduleTopic);
    } catch (e) {
      console.log(e.message);
    }
  },
  async setListTopic ({ commit, state }, id) {
    try {
      const listSchedule = state.listScheduleTopic;
      const listTopic = listSchedule.find((element) => element._id === id);
      commit('setListTopic', listTopic.topics);
    } catch (e) {
      console.log(e.message);
    }
  },
};

const mutations = {
  setListSchedules: (state, listScheduleTopic) => {
    state.listScheduleTopic = listScheduleTopic;
  },
  setListTopic: (state, listTopic) => {
    state.listTopic = listTopic;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

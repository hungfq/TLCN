import ScheduleApi from '../utils/api/schedule';
import TaskApi from '../utils/api/task';

const initState = {
  listScheduleTopic: [],
  listTopic: [],
  listTask: [],
};

const getters = {
  listScheduleTopic: (state) => state.listScheduleTopic,
  listTopic: (state) => state.listTopic,
  listTask: (state) => state.listTask,
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
  async fetchAllTask ({ commit }, payload) {
    try {
      const { token, topicId } = payload;
      const listTask = await TaskApi.listAllTask(token, topicId);
      commit('setListTask', listTask);
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
  setListTask: (state, listTask) => {
    state.listTask = listTask;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

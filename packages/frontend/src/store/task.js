import ScheduleApi from '../utils/api/schedule';
import TopicApi from '../utils/api/topic';
import TaskApi from '../utils/api/task';

const initState = {
  listScheduleTopic: [],
  listTopic: [],
  topicId: null,
  listTask: [],
  listMember: [],
  listStudents: [],
  taskDetail: '',
};

const getters = {
  listScheduleTopic: (state) => state.listScheduleTopic,
  listTopic: (state) => state.listTopic,
  topicId: (state) => state.topicId,
  listTask: (state) => state.listTask,
  listMember: (state) => state.listMember,
  listStudents: (state) => state.listStudents,
  taskDetail: (state) => state.taskDetail,
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
      commit('setTopicId', topicId);
    } catch (e) {
      console.log(e.message);
    }
  },
  async fetchListMember ({ commit }, payload) {
    try {
      const { token, topicId } = payload;
      const listMember = await TopicApi.listTopicMember(token, topicId);
      commit('setListMember', listMember);
    } catch (e) {
      console.log(e.message);
    }
  },

  async fetchListStudents ({ commit }, payload) {
    try {
      const { token, topicId } = payload;
      const listStudents = await TopicApi.listTopicStudents(token, topicId);
      commit('setListStudents', listStudents);
    } catch (e) {
      console.log(e.message);
    }
  },
  async fetchTaskDetail ({ commit }, payload) {
    try {
      const { token, taskId } = payload;
      if (!taskId) {
        commit('setTaskDetail', {
          code: '',
          title: '',
          description: '',
        });
        return;
      }
      const taskDetail = await TaskApi.getTaskDetail(token, taskId);
      commit('setTaskDetail', taskDetail);
    } catch (e) {
      console.log(e.message);
    }
  },
  // eslint-disable-next-line no-unused-vars
  async insertTask ({ dispatch }, payload) {
    try {
      const { token, value, topicId } = payload;
      await TaskApi.insertTask(token, value, topicId);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateTask ({ dispatch }, payload) {
    try {
      const { token, value } = payload;
      await TaskApi.updateTask(token, value);
      dispatch('fetchTaskDetail', { token, taskId: value._id });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateTaskStatus ({ dispatch }, payload) {
    try {
      const { token, value } = payload;
      await TaskApi.updateTask(token, value);
      dispatch('fetchTaskDetail', { token, taskId: value._id });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async insertComment ({ dispatch }, payload) {
    try {
      const { token, message, taskId } = payload;
      await TaskApi.insertComment(token, message, taskId);
      dispatch('fetchTaskDetail', { token, taskId });
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async removeComment ({ dispatch }, payload) {
    try {
      const { token, commentId, taskId } = payload;
      await TaskApi.removeComment(token, commentId, taskId);
      dispatch('fetchTaskDetail', { token, taskId });
    } catch (e) {
      throw new Error(e.message);
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
  setTopicId: (state, topicId) => {
    state.topicId = topicId;
  },
  setListTask: (state, listTask) => {
    state.listTask = listTask;
  },
  setListMember: (state, listMember) => {
    state.listMember = listMember;
  },
  setListStudents: (state, listStudents) => {
    state.listStudents = listStudents;
  },
  setTaskDetail: (state, taskDetail) => {
    state.taskDetail = taskDetail;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

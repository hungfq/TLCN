const initState = {
  url: null,
  page: null,
  module: null,
  section: null,
  id: null,
};

const getters = {
  url: (state) => state.url,
  page: (state) => state.page || 'management',
  module: (state) => state.module || 'student',
  section: (state) => state.section || 'student-list',
  id: (state) => state.id,
};

const actions = {
  async updateUrl ({ commit, dispatch, rootState }, url) {
    commit('setUrl', url);
  },
  async updatePage ({ commit, dispatch, rootState }, page) {
    commit('setPage', page);
  },
  async updateModule ({ commit, dispatch, rootState }, module) {
    commit('setModule', module);
  },
  async updateSection ({ commit, dispatch, rootState }, section) {
    commit('setSection', section);
  },
  async updateId ({ commit, dispatch, rootState }, id) {
    commit('setId', id);
  },
};

const mutations = {
  setUrl: (state, url) => {
    state.url = url;
    const subUrl = url.substring(1).split('/').slice(1);
    [state.page, state.module, state.section, state.id] = subUrl;
  },
  setPage: (state, page) => {
    state.page = page;
  },
  setModule: (state, module) => {
    state.module = module;
  },
  setSection: (state, section) => {
    state.section = section;
  },
  setId: (state, id) => {
    state.id = id;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

import { signInWithGoogle } from '../utils/api/auth';

const emptyUserInfo = {
  email: null,
  _id: null,
  role: null,
  token: null,
  picture: null,
};

const initState = {
  isAuthenticated: false,
  userInfo: emptyUserInfo,
};

const getters = {
  userId: (state) => state.userInfo._id,
  userEmail: (state) => state.userInfo.email,
  isAuthenticated: (state) => state.isAuthenticated,
  userInfo: (state) => state.userInfo,
  token: (state) => state.userInfo.token,
  userRole: (state) => state.userInfo.role,
};

const actions = {
  async signIn ({ commit, dispatch, rootState }, payload) {
    try {
      const { access_token } = payload;
      const res = await signInWithGoogle(access_token);
      if (res.status === 200) {
        const { data } = res;
        const { userInfo, accessToken } = data;
        commit('setAuthenticated', { ...userInfo, token: accessToken });
      } else {
        console.log(e);
        // handle ui display error in UI
        console.log('Error in login');
      }
    } catch (e) {
      console.log(e);
      // handle ui display error in UI
      console.log('Error in login');
    }
  },

  async signOut ({ commit }) {
    commit('unsetAuthenticated');
    window.location.href = `${window.location.origin}/`;
  },
};

const mutations = {
  setAuthenticated: (state, userInfo) => {
    state.userInfo = userInfo;
    state.isAuthenticated = true;
  },
  unsetAuthenticated: (state) => {
    state.userInfo = emptyUserInfo;
    state.isAuthenticated = false;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

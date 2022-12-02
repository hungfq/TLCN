import { signInWithGoogle } from '../utils/api/auth';
import UserApi from '../utils/api/user';

const emptyUserInfo = {
  email: null,
  _id: null,
  role: null,
  token: null,
  picture: null,
  name: null,
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
  userName: (state) => state.userInfo.name,
};

const actions = {
  async signIn ({ commit, dispatch, rootState }, payload) {
    try {
      const { access_token, type } = payload;
      const res = await signInWithGoogle(access_token, type);
      if (res.status === 200) {
        const { data } = res;
        const { userInfo, accessToken, role } = data;
        commit('setAuthenticated', { ...userInfo, role, token: accessToken });
      } else {
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
  async fetchInfo ({ commit }, token) {
    const userInfo = await UserApi.getUserInfo(token);
    commit('setUserInfo', userInfo);
  },
};

const mutations = {
  setAuthenticated: (state, userInfo) => {
    state.userInfo = userInfo;
    state.isAuthenticated = true;
  },
  setUserInfo: (state, userInfo) => {
    state.userInfo.name = userInfo.name;
    state.userInfo.sex = userInfo.sex;
    state.userInfo.code = userInfo.code;
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

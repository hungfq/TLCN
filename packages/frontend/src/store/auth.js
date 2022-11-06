import Vue from 'vue';
import _get from 'lodash/get';
import { MAX_PERMISSION } from '@/constants/diagramPermissions';
import { saveAnswerSurvey } from '../utils/api';
import { signInWithIdToken } from '../utils/api/auth';
import { pushEvent } from '../utils/gtmDataLayer';
import { USER_SIGNUP_EVENT, USER_LOGIN_EVENT, USER_LOGOUT_EVENT } from '../constants/gtmEventTypes';

const emptyUserInfo = {
  username: null,
  _id: null,
  token: null,
};

const initState = {
  authError: null,
  isAuthenticated: false,
  userInfo: emptyUserInfo,
  isAuthenticating: false,
  isSubmiting: false,
};

const getters = {
  userId: (state) => _get(state, 'userInfo._id', null),
  userEmail: (state) => _get(state, 'userInfo.email', null),
  isSubmiting: (state) => _get(state, 'isSubmiting', false),
  isAuthenticated: (state) => _get(state, 'isAuthenticated', false),
  userInfo: (state) => state.userInfo,
  token: (state) => _get(state, 'userInfo.token', ''),
  provider: (state) => _get(state, 'userInfo.provider', ''),
};

const actions = {
  async signIn ({ commit, dispatch, rootState }, payload) {
    commit('setAuthError', null);
    commit('setIsAuthenticating', true);
    try {
      const res = await signInWithIdToken(payload);
      if (res.status === 200) {
        const { data } = res;
        const { userInfo, token } = data;
        const { routeModule: { params: { queryid } } } = rootState;

        commit('setAuthenticated', { ...userInfo, token });
        dispatch('ui/closeNeedLoginModal', true, { root: true });
        // track user login
        if (userInfo.isNewUser) {
          pushEvent(USER_SIGNUP_EVENT, { userId: userInfo.email });
        } else {
          pushEvent(USER_LOGIN_EVENT, { userId: userInfo.email });
        }
        if (queryid) {
          // perform load query again to update permission and init collab session
          dispatch('query/getQuery', { queryid }, { root: true });
        } else {
          // set max permission when in `/d`
          commit('query/setUserPermission', MAX_PERMISSION, { root: true });
        }
      } else {
        commit('setAuthError', res.error);
        if (payload.provider !== 'email') {
          const provider = payload.provider[0].toUpperCase() + payload.provider.slice(1);
          Vue.notify({
            group: 'alert',
            title: 'An error occurred',
            text: `Can not sign in with ${provider}, please try again!`,
            type: 'error',
          });
        }
      }
    } catch (e) {
      if (payload.provider !== 'email') {
        const provider = payload.provider[0].toUpperCase() + payload.provider.slice(1);
        Vue.notify({
          group: 'alert',
          title: 'An error occurred',
          text: `Can not sign in with ${provider}, please try again!`,
          type: 'error',
        });
        commit('setAuthError', e);
      } else if (e.response && e.response.status === 400) {
        commit('setAuthError', 'Invalid OTP, please try again!');
      } else {
        commit('setAuthError', 'Can not validate OTP, please try again!');
      }
    }
    commit('setIsAuthenticating', false);
  },

  async saveAnswer ({ state, commit }, { questionId, answer }) {
    commit('setSubmitingAnswer', true);
    const { token } = state.userInfo;
    try {
      const res = await saveAnswerSurvey({ token, questionId, answer });
      commit('setAnswers', res.data.answers);
    } catch (e) {
      Vue.notify({
        group: 'alert',
        title: 'An error occurred',
        position: 'top left',
        type: 'error',
      });
    }
    commit('setSubmitingAnswer', false);
  },

  async signOut ({ state, commit, dispatch }) {
    commit('setIsAuthenticating', true);
    try {
      const { userInfo } = state;
      if (userInfo.provider === 'google') {
        await GoogleApi.signOut();
      }
      commit('unsetAuthenticated');
      commit('queriesOfUser/unsetQueryOfUser', null, { root: true });
      // track user logout
      pushEvent(USER_LOGOUT_EVENT, { userId: userInfo.email });
    } catch (e) {
      commit('setAuthError', e);
    }
    window.location.href = `${window.location.origin}/d`;
  },
};

const mutations = {
  setSubmitingAnswer: (state, isSubmiting) => {
    state.isSubmitingAnswer = isSubmiting;
  },
  setAuthenticated: (state, userInfo) => {
    state.userInfo = userInfo;
    state.isAuthenticated = true;
  },
  setAnswers: (state, answers) => {
    // incase user does not have answers key before
    state.userInfo = {
      ...state.userInfo,
      answers,
    };
  },
  unsetAuthenticated: (state) => {
    state.userInfo = emptyUserInfo;
    state.isAuthenticated = false;
  },
  setIsInitGapi: (state, isInitGapi) => {
    state.isInitGapi = isInitGapi;
  },
  setAuthError: (state, error) => {
    state.authError = error;
  },
  setIsAuthenticating: (state, isAuthenticating) => {
    state.isAuthenticating = isAuthenticating;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};

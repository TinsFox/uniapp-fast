import { getToken, setToken, removeToken } from '@/utils/auth';
import User from '../../api/user';
import store from '@/store/index.js'; //需要引入store

const state = {
  accessToken: getToken().accessToken,
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  expiresIn: getToken().expiresIn || 0
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.accessToken = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_EXPIRES_IN: (state, expiresIn) => {
    state.expiresIn = expiresIn;
  }

};

const actions = {
  // user login
  login({ commit }, js_code) {
    const vuexUser = store.state.user;
    if (vuexUser.accessToken && Date.now() < vuexUser.expiresIn) {
      // TODO:1. 已经登陆后不需要再次登陆; 2checkSession
      console.log('不需要登陆？', vuexUser);
      return true;
    }
    const { code } = js_code;
    User.getAccessToken(code.trim()).then(response => {
      // TODO:优化开发环境时token的失效时间
      if (process.env.NODE_ENV === 'development') {
        response.expiresIn = new Date().getTime() + 60 * 60 * 2 * 1000;
      }
      commit('SET_TOKEN', response.token);
      commit('SET_EXPIRES_IN', response.expiresIn);
      delete response.msg;
      delete response.code;
      setToken(response);
    });
    return true;
    // return new Promise((resolve, reject) => {
    //   console.log("actions/user login")
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    User.getUserInfo().then(response => {
      console.log('获取用户信息', response);
    });
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response;
    //     if (!data) {
    //       reject('Verification failed, please Login again.');
    //     }
    //     const { roles, name, avatar, introduction } = data;
    //     // roles must be a non-empty array
    //     if (!roles || roles.length <= 0) {
    //       reject('getInfo: roles must be a non-null array!');
    //     }
    //     commit('SET_ROLES', roles);
    //     commit('SET_NAME', name);
    //     commit('SET_AVATAR', avatar);
    //     commit('SET_INTRODUCTION', introduction);
    //     resolve(data);
    //   }).catch(error => {
    //     reject(error);
    //   });
    // });
  },

  // user logout
  // logout({ commit, state, dispatch }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       commit('SET_TOKEN', '')
  //       commit('SET_ROLES', [])
  //       removeToken()
  //       resetRouter()
  //       // reset visited views and cached views
  //       // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
  //       dispatch('tagsView/delAllViews', null, { root: true })
  //
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      resolve();
    });
  }

  // dynamically modify permissions
  // async changeRoles({ commit, dispatch }, role) {
  //   const token = role + '-token'
  //   commit('SET_TOKEN', token)
  //   setToken(token)
  //   const { roles } = await dispatch('getInfo')
  //   resetRouter()
  //   // generate accessible routes map based on roles
  //   const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
  //   // dynamically add accessible routes
  //   router.addRoutes(accessRoutes)
  //
  //   // reset visited views and cached views
  //   dispatch('tagsView/delAllViews', null, { root: true })
  // }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('cl_token') || '',
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading';
        },
        auth_success(state, token, user) {
            state.status = 'success';
            state.token = token;
            state.user = user;
        },
        auth_error(state) {
            state.status = 'error';
        },
        logout(state) {
            state.status = '';
            state.token = '';
        }
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                // console.log('hee')
                commit('auth_request');
                // console.log(user)

                Vue.prototype.$http.post("/auth/login", user)
                .then(resp => {
                    console.log(resp)
                    let data = resp.data;
                    const token = data.accessToken;
                    const user = null;
                    localStorage.setItem("cl_token", token);
                    axios.defaults.headers.common['x-access-token'] = token;
                    commit('auth_success', token, user);
                    resolve(resp);
                })
                .catch(err => {
                    console.log(err);
                    commit('auth_error');
                    localStorage.removeItem('cl_token');
                   
                    reject(err)
                });
            });
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit('logout');
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['x-access-token'];
                resolve();
            });
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status
    }
});
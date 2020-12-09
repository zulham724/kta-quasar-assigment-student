/* Module1.store.js */
import axios from "axios";

// State object
const state = {
    auth: null,
    is_unauthorized:false,
    client_id: 2,
    client_secret: "RM0SqcmpoatgzQ5JXi6aeEXYI6dSaPiWDSbTW79s",
    token: {},
};

// Mutations
const mutations = {
    merubah_token(state,payload){
        state.token = payload.asd
    },
    auth_success(state, payload) {
        state.token = payload.token;
        state.auth = payload.auth;
        state.is_unauthorized = false;

    },
    setAuth(state, payload) {
        state.auth = payload.auth;
    },
    logout(state) {
        state.token = {}
        state.auth = ''
    },
    setUnauthorized(state, is_unauthorized){
        state.is_unauthorized=is_unauthorized;
    }
};

// Actions
const actions = {
    login({ commit }, credential) {
        return new Promise((resolve, reject) => {
            const access = {
                grant_type: "password",
                client_id: this.state.Auth.client_id,
                client_secret: this.state.Auth.client_secret,
                ...credential
            };
            axios
                .post(`${this.state.Setting.url}/oauth/token`, access)
                .then(resp => {
                    const token = resp.data;
                    axios.defaults.headers.common.Accept = "application/json";
                    axios.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;
                    axios
                        .get(`${this.state.Setting.url}/api/v1/auth/assigment/student`)
                        .then(res => {
                            if(res.data.role_id != 8){
                                delete axios.defaults.headers.common.Authorization
                                return reject({
                                    response:{
                                        data:{
                                            message: 'This app for student only'
                                        }
                                    }
                                })
                            }
                            //pusher
                            //const pusher =
                        
                            //
                            const auth = res.data;
                            // Add the following line:
                            const payload = {
                                token: token,
                                auth: auth
                            };
                            commit("auth_success", payload);
                            resolve(resp);
                        })
                        .catch(err => {
                            reject(err);
                        });
                })
                .catch(err => {
                    reject(err);
                    localStorage.clear();
                });
        });
    },
    updateProfile({ commit, dispatch }, user) {
        return new Promise((resolve, reject) => {
            const access = {
                _method: "put",
                ...user
            };
            axios
                .post(
                    `${this.state.Setting.url}/api/v1/user/${this.state.Auth.auth.id}`,
                    access
                )
                .then(res => {
                    // commit("setProfile", { profile: res.data.profile });
                    dispatch('getAuth')
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    register({ commit }, credential) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.state.Setting.url}/api/register`, credential)
                .then(resp => {
                    const token = resp.data;
                    axios.defaults.headers.common.Accept = "application/json";
                    axios.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;
                    axios
                        .get(`${this.state.Setting.url}/api/user`)
                        .then(res => {
                            const auth = res.data;
                            const payload = {
                                token: token,
                                auth: auth
                            };
                            commit("auth_success", payload);
                            resolve(resp);
                        })
                        .catch(err => {
                            reject(err);
                        });
                })
                .catch(err => {
                    localStorage.clear();
                    reject(err);
                });
        });
    },
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            const user_id=state.auth.id;
            const channel='notification.'+user_id;
            console.log('leaving channel: '+channel);
            if(window.Echo){
                window.Echo.leave(channel);
                window.Echo=null;
            }

            commit("logout")
            commit("EchoNotification/deleteItems",null,{root:true});
         
            delete axios.defaults.headers.common.Authorization
            resolve()
        })
    },
    changePassword({commit}, payload){
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.state.Setting.url}/api/v1/users/changePassword`, payload)
                .then(res => {
                   if(res.data.error){
                       reject(res.data)
                   }else{
                       resolve(res.data)
                   }
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    getAuth({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/auth/assigment/student`)
                .then(res => {
                    const auth = res.data
                        // Add the following line:
                    const payload = {
                        auth: auth
                    }
                    commit("setAuth", payload)
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
};

// Getter functions
const getters = {
    isLoggedIn: state => !!state.token.access_token,
    isUnAuthorized: state=>state.is_unauthorized,
    auth: state => state.auth,
    token: state => state.token
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
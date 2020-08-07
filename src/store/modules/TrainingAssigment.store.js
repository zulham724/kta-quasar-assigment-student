/* Module1.store.js */
import axios from 'axios'
// State object
const state = {
    assigments: null
}

// Mutations
const mutations = {
    set(state, payload) {
        console.log('cok')
        console.log(payload.assigments.data)
        state.assigments = payload.assigments;
      
    },
    remove(state, payload) {
        const index = state.assigments.data.findIndex(
            item => item.id == payload.id
        );
        state.assigments.data.splice(index, 1);
    },
    add(state, payload) {
        state.assigments.data = [payload.assigment, ...state.assigments.data];
    },
    next(state, payload) {
        // let new_array = removeDuplicates([...state.assigments.data, ...payload.assigments.data], 'id')
        state.assigments = {
            ...payload.assigments,
            data: [
                ...state.assigments.data,
                ...payload.assigments.data
            ]
        }
    }
}

// Actions
const actions = {
    index({ commit }, subject='') {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/assigments/getmasterpublish/${subject}`)
                .then(res => {
                    commit("set", { assigments: res.data });
                    //console.log('cok',res.data);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    // store({ commit }, access) {
    //     console.log(access)
    //     return new Promise((resolve, reject) => {
    //         axios
    //             .post(`${this.state.Setting.url}/api/v1/finishedassigment`, access)
    //             .then(res => {
    //                 commit("add", { assigment: res.data });
    //                 resolve(res);
    //             })
    //             .catch(err => {
    //                 reject(err);
    //             });
    //     });
    // },
    show({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/assigment/${payload.assignmentId}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    showSelectOptionsOnly({commiy}, payload){
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/assigment/selectoptionsonly/${payload.assignmentId}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    next({ commit, state }, next_page_url) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${next_page_url}`)
                .then(res => {
                    //commit("next", { assigments: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
}

// Getter functions
const getters = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
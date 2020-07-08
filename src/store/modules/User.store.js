/* Module1.store.js */
import axios from "axios";

// State object
const state = {
    
};

// Mutations
const mutations = {
    
};

// Actions
const actions = {
    searchUserAssigment({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/assigments/users/search/${payload.code}`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
};

// Getter functions
const getters = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
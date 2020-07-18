/* Module1.store.js */
import axios from 'axios'
// State object
const state = {
    assigment_session: {
        
    }
}

// Mutations
const mutations = {

}

// Actions
const actions = {
    store({commit,dispatch},payload){
        return new Promise((resolve,reject)=>{
            axios.post(`${this.state.Setting.url}/api/v1/assigmentsession`,payload).then(res=>{
                // dispatch('Auth/getAuth')
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    checkAndStore({commit}, payload){
        return new Promise((resolve, reject) => {
            axios.post(`${this.state.Setting.url}/api/v1/assigment/checkandstore`,payload).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
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
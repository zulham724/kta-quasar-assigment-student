/* Module1.store.js */
import axios from 'axios'
// State object
const state = {
	grade: []
}

// Mutations
const mutations = {
    setGrade(state, payload) {
        state.grade = payload.map(e=>{
            return {...e}
        })
    }

}

// Actions
const actions = {
    index({commit}){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.state.Setting.url}/api/v1/educationallevel`).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    show({commit}, id){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.state.Setting.url}/api/v1/educationallevel/${id}`).then(res=>{
                commit("setGrade", res.data.grades);
                //console.log("dalam module: ", this.state.EducationalLevel.grade)
                //console.log(res.data.grades)
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }
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
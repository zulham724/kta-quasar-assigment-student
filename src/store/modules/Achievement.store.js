/* Module1.store.js */
import axios from 'axios'
import moment from "moment";
import { AppFullscreen } from 'quasar';
// State object
const state = {
    items: [
        {
            id: 1,
            name: "Daily Task 1",
            description: "Menyelesaikan 3 paket soal",
            value: 0,
            limit: 3
        },
        {
            id:2,
            name: "Daily Task 2",
            description: "Mengerjakan 20 soal",
            value: 0,
            limit: 20
        },
        {   
            id:3,
            name: "Daily Task 3",
            description: "Mendapat nilai diatas 75",
            value: 0,
            limit: 3
        },
        {
            id:4,
            name: "Daily Task 4",
            description: "Mengerjakan 2 latihan mandiri",
            value: 0,
            limit: 2
        },
        {
            id:5,
            name: "Daily Task 5",
            description: "Mendapatkan skor sempurna",
            value: 0,
            limit: 1
        }
    ]
}

// Mutations
const mutations = {
    // const dt1 = Achivement.items.find(item=>item.id == 1)
    update(state,payload){

    },
    increment(state,payload){
        const index = state.items.findIndex(item=>item.id == payload.id)
        state.items[index].value += 1
    },
    increment_batch(state,payload){
        const index = state.items.findIndex(item=>item.id == payload.id)
        state.items[index].value += payload.value
    },
    decreament(state){
        state.items.forEach(item=>{
            item.value = 0
        })
    },
    setValuetoLimit(state,payload){
        const index = state.items.findIndex(item=>item.id == payload.id)
        state.items[index].value = payload.limit
    }
}

// Actions
const actions = {
    calculate({commit}) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/auth/assigment/student`)
                .then(res => {
                    const auth = res.data
                    commit('decreament')
                    auth.sessions.forEach(session => {
                        let create = moment(session.created_at).format('LL')
                        let now = moment().format('LL')
                        // console.log("now : ",now, "create: ", create," id: ", session.id)
                        if( now == create) {
                            if (this.state.Achievement.items[0].value <= this.state.Achievement.items[0].limit) {
                                commit('increment',{id:1})
                            }
                            if (this.state.Achievement.items[1].value <= this.state.Achievement.items[1].limit) {
                                const payload = {
                                    id:2,
                                    value:session.questions.length
                                }
                                commit('increment_batch',payload)
                            }
                            if (session.value == 100){
                                if (this.state.Achievement.items[2].value <= this.state.Achievement.items[2].limit) {
                                    commit('increment',{id:3})
                                }
                                if (this.state.Achievement.items[4].value <= this.state.Achievement.items[4].limit) {
                                    commit('increment',{id:5})
                                }
                            } else if(session.value > 75) {
                                if (this.state.Achievement.items[4].value <= this.state.Achievement.items[4].limit) {
                                    commit('increment',{id:5})
                                }
                            }
                        }
                    });
                    this.state.Achievement.items.forEach(item => {
                        if (item.value >= item.limit) {
                            commit('setValuetoLimit',item)
                        }
                    })
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
        
        // this.$store.dispatch('Auth/getAuth').then(res=>{
        // })

        // this.Auth.auth.sessions.forEach(session => {
        //     let create = moment(session.created_at).format('LL')
        //     let now = moment().format('LL')
        //     console.log("now : ",now, "create: ", create," id: ", session.id)
        //     if( now == create) {
        //         commit('increment',{id:1})
        //         const payload = {
        //             id:2,
        //             value:session.questions.length
        //         }
        //         commit('increment_batch',payload)
        //         if (session.value == 100){
        //             commit('increment',{id:3})
        //             commit('increment',{id:5})
        //         } else if(session.value > 75) {
        //             commit('increment',{id:5})
        //         }
        //         }
        //   });
        //   console.log("DT1: ",Achivement.items.find(item=>item.id == 1).value,
        //   " DT2: ",Achivement.items.find(item=>item.id == 2).value,
        //   " DT3 : ",Achivement.items.find(item=>item.id == 3).value,
        //   " DT5: ",Achivement.items.find(item=>item.id == 5).value)
        //   if (Achivement.items.find(item=>item.id == 1)> 3) {
            
        //   }
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
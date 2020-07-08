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
    ],
    Skor_sempurna: null,
    Jumlah_post: null,
    Soal_selesai: null
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
    decreamentAchievement(state){
       state.Soal_selesai = 0
       state.Jumlah_post = 0
       state.Skor_sempurna = 0
    },
    setValuetoLimit(state,payload){
        const index = state.items.findIndex(item=>item.id == payload.id)
        state.items[index].value = payload.limit
    },
    increment_soal(state,payload) {
        state.Soal_selesai += payload.questions.length
    },
    increment_post(state,payload){
        state.Jumlah_post = payload.posts.length
    },
    increment_score(state){
        state.Skor_sempurna += 1
    }    
}

// Actions
const actions = {
    calculateDailyTask({commit}) {
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
    },
    calculateAchievement({commit}) {
        return new Promise((resolve, reject) => {
            axios
            .get(`${this.state.Setting.url}/api/v1/auth/assigment/student`)
            .then(res => {
                const auth = res.data
                commit('decreamentAchievement')
                commit('increment_post', auth)
                auth.sessions.forEach(session => {
                    commit('increment_soal', session)
                    if (session.value == 100){
                        commit('increment_score')
                    } else{
                        null
                    }
                })
                console.log("ini skor sempurna: ", this.state.Achievement.Skor_sempurna, )
                console.log("ini jumlah post: ", this.state.Achievement.Jumlah_post, )
                console.log("ini soal selesai: ", this.state.Achievement.Soal_selesai, )    
                resolve(res)
            })
            .catch(err => {
                reject(err)
            });
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
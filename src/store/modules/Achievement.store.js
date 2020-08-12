/* Module1.store.js */
import axios from "axios";
import moment from "moment";
import { AppFullscreen } from "quasar";
// State object
const state = {
  items: [
    {
      id: 1,
      name: "Daily Task 1",
      description: "Menyelesaikan 3 paket soal",
      value: 0,
      limit: 3,
      daily_progress:0
    },
    {
      id: 2,
      name: "Daily Task 2",
      description: "Mengerjakan 20 soal",
      value: 0,
      limit: 20,
      daily_progress:0
    },
    {
      id: 3,
      name: "Daily Task 3",
      description: "Mendapat nilai diatas 75",
      value: 0,
      limit: 3,
      daily_progress:0
    },
    {
      id: 4,
      name: "Daily Task 4",
      description: "Mengerjakan 2 latihan mandiri",
      value: 0,
      limit: 2,
      daily_progress:0
    },
    {
      id: 5,
      handle: () => {},
      name: "Daily Task 5",
      description: "Mendapatkan skor sempurna",
      value: 0,
      limit: 1,
      daily_progress:0
    }
  ],
  achievements_account: {
    perfect_score: null,
    total_post: null,
    finished_question: null
  }
};

// Mutations
const mutations = {
  // const dt1 = Achivement.items.find(item=>item.id == 1)
  update(state, payload) {},
  increment(state, payload) {
    const index = state.items.findIndex(item => item.id == payload.id);
    state.items[index].value += 1;
  },
  increment_batch(state, payload) {
    const index = state.items.findIndex(item => item.id == payload.id);
    state.items[index].value += payload.value;
  },
  decreament(state) {
    state.items.forEach(item => {
      item.value = 0;
    });
  },
  decreamentAchievement(state) {
    state.achievements_account.finished_question = 0;
    state.achievements_account.total_post = 0;
    state.achievements_account.perfect_score = 0;
  },
  setValuetoLimit(state, payload) {
    const index = state.items.findIndex(item => item.id == payload.id);
    state.items[index].value = state.items[index].limit;
    state.items[index].daily_progress = '100';
  },
  setValueto(state, payload) {
    const index = state.items.findIndex(item => item.id == payload.id);
    state.items[index].value = payload.value;
    state.items[index].daily_progress = (payload.value/state.items[index].limit*100).toFixed(2);
  },
  increment_question(state, payload) {
    state.achievements_account.finished_question += payload.questions.length;
  },
  increment_post(state, payload) {
    state.achievements_account.total_post = payload.posts.length;
  },
  increment_score(state) {
    state.achievements_account.perfect_score += 1;
  },

};

// Actions
const actions = {
  calculateDailyTask({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.state.Setting.url}/api/v1/auth/assigment/student/finishedtoday`)
        .then(res => {
          //mengecek achievement ke-1
          if (res.data.main_assigment.length >= state.items[0].limit) {
            commit("setValuetoLimit", { id: 1 });
          } else {
            commit("setValueto", {
              id: 1,
              value: res.data.main_assigment.length
            });
          }
          ///mengecek achievement ke-2, ke-3, ke-5
          let merged_assigments = [...res.data.main_assigment,...res.data.training_assigment];
          let jumlah_soal = 0;
          let above_threshold_count = 0;
          let perfect_score_count = 0;
          merged_assigments.forEach(item => {
            jumlah_soal += item.questions_count; //achievement ke-2
            above_threshold_count +=
              item.assigments[0].pivot.total_score >= 75 ? 1 : 0; //achievemnt ke-3
            perfect_score_count +=
              item.assigments[0].pivot.total_score == 100 ? 1 : 0;
          });
          //achievemnt ke-2
          if (jumlah_soal >= state.items[1].limit) {
            commit("setValuetoLimit", { id: 2 });
          } else {
            commit("setValueto", { id: 2, value: jumlah_soal });
          }
          //achievemnt ke-3
          if (above_threshold_count >= state.items[2].limit) {
            commit("setValuetoLimit", { id: 3 });
          } else {
            commit("setValueto", { id: 3, value: above_threshold_count });
          }
          //achievemnt ke-5
          if (perfect_score_count >= state.items[4].limit) {
            commit("setValuetoLimit", { id: 5 });
          } else {
            commit("setValueto", { id: 5, value: perfect_score_count });
          }

          //mengecek achievement ke-4
          if (res.data.training_assigment.length >=state.items[3].limit) {
            commit("setValuetoLimit", { id: 4 });
          } else {
            commit("setValueto", {
              id: 4,
              value: res.data.training_assigment.length
            });
          }
          resolve();
        });
    }).catch(err=>{
        reject(err)
    });
  },
  calculateDailyTask_old({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.state.Setting.url}/api/v1/auth/assigment/student`)
        .then(res => {
          const auth = res.data;
          commit("decreament");
          auth.sessions.forEach(session => {
            let create = moment(session.created_at).format("LL");
            let now = moment().format("LL");
            // console.log("now : ",now, "create: ", create," id: ", session.id)
            if (now == create) {
              if (
                this.state.Achievement.items[0].value <=
                this.state.Achievement.items[0].limit
              ) {
                commit("increment", { id: 1 });
              }
              if (
                this.state.Achievement.items[1].value <=
                this.state.Achievement.items[1].limit
              ) {
                const payload = {
                  id: 2,
                  value: session.questions.length
                };
                commit("increment_batch", payload);
              }
              if (session.value == 100) {
                if (
                  this.state.Achievement.items[2].value <=
                  this.state.Achievement.items[2].limit
                ) {
                  commit("increment", { id: 3 });
                }
                if (
                  this.state.Achievement.items[4].value <=
                  this.state.Achievement.items[4].limit
                ) {
                  commit("increment", { id: 5 });
                }
              } else if (session.value > 75) {
                if (
                  this.state.Achievement.items[4].value <=
                  this.state.Achievement.items[4].limit
                ) {
                  commit("increment", { id: 5 });
                }
              }
            }
          });
          this.state.Achievement.items.forEach(item => {
            if (item.value >= item.limit) {
              commit("setValuetoLimit", item);
            }
          });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  calculateAchievement({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.state.Setting.url}/api/v1/auth/assigment/student`)
        .then(res => {
          const auth = res.data;
          commit("decreamentAchievement");
          commit("increment_post", auth);
          auth.sessions.forEach(session => {
            commit("increment_question", session);
            if (session.value == 100) {
              commit("increment_score");
            } else {
              null;
            }
          });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
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

/* Module1.store.js */
import axios from "axios";
// State object
const state = {
    comment : {

    }
};

// Mutations
const mutations = {
    set(state, payload) {
        // payload.posts.data.map(item => item.isReadMore = false)
        state.comment = payload.data;
    },
    addLikes(state, payload) {
        state.comment.likes_count += 1
    },
    addLiked(state, payload) {
        state.comment.liked_count = 1
    },
    removeLikes(state, payload) {
        state.comment.likes_count -= 1
    },
    removeLiked(state, payload) {
        state.comment.liked_count = 0
    },
};

// Actions
const actions = {
    index({ commit }, id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/comment/${id}`)
                .then(res => {
                    commit("set", res);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    store({ commit }, payload) {
        return new Promise((resolve, reject) => {
            const access = {
                post_id: payload.post_id,
                user_id: payload.user_id,
                value: payload.value
            };
            axios
                .post(`${this.state.Setting.url}/api/v1/postcomment`, access)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    show({ commit }, id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/comment/${id}`)
                .then(res => {
                    commit("set", res);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    destroy() {},
    likeComment({ commit }, commentId) {
        return new Promise((resolve, reject) => {
            const access = {
                comment_id: commentId
            };
            axios
                .post(`${this.state.Setting.url}/api/v1/commentlike`, access)
                .then(res => {
                    commit("addLikes");
                    commit("addLiked");
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    dislikeComment({ commit }, commentId) {
        return new Promise((resolve, reject) => {
            const access = {
                _method: `delete`
            };
            axios
                .post(`${this.state.Setting.url}/api/v1/commentlike/${commentId}`, access)
                .then(res => {
                    resolve(res);
                    commit("removeLikes");
                    commit("removeLiked");
                    // console.log("ini data dislike: ", this.state.PostComment.comment)
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
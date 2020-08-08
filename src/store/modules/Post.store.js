/* Module1.store.js */
import axios from "axios";

// State object
const state = {
    posts: {},
    ownedposts: {}
};

// Mutations
const mutations = {
    set(state, payload) {
        // payload.posts.data.map(item => item.isReadMore = false)
        state.posts = payload.posts;
    },
    set2(state, payload) {
        // payload.posts.data.map(item => item.isReadMore = false)
        state.ownedposts = payload.posts;
    },
    setComment(state, payload) {
        // payload.posts.data.map(item => item.isReadMore = false)
        state.posts = payload;
    },
    remove(state, payload) {
        const index = state.posts.data.findIndex(item => item.id == payload.id);
        if(index>-1)state.posts.data.splice(index, 1);

        const index2 = state.ownedposts.data.findIndex(item => item.id == payload.id);
        if(index2>-1)state.ownedposts.data.splice(index2, 1);
    },
    add(state, payload) {
        // payload.post.isReadMore = false
        const index = state.posts.data.findIndex(item => item.id == payload.id);
        if(index==-1) state.posts.data = [payload.post, ...state.posts.data];
    },
    add2(state, payload) {
        // payload.post.isReadMore = false
        const index = state.ownedposts.data.findIndex(item => item.id == payload.id);
        state.ownedposts.data = [payload.post, ...state.ownedposts.data];
    },
    update(state, payload) {
    
        const index = state.posts.data.findIndex(item => item.id == payload.id);
        if(index>-1)state.posts.data[index].body = payload.body

        const index2 = state.ownedposts.data.findIndex(item => item.id == payload.id);
        if(index2>-1)state.ownedposts.data[index2].body = payload.body
    },
    addLikes(state, payload) {
        const index = state.posts.data.findIndex(item=>item.id == payload.id);
        state.posts.data[index].likes_count += 1;
    },
    addLiked(state, payload) {
        const index = state.posts.data.findIndex(item=>item.id == payload.id);
        state.posts.data[index].liked_count = 1;
    },
    removeLikes(state, payload) {
        const index = state.posts.data.findIndex(item=>item.id == payload.id);
        state.posts.data[index].likes_count -= 1;
    },
    removeLiked(state, payload) {
        const index = state.posts.data.findIndex(item=>item.id == payload.id);
        state.posts.data[index].liked_count = 0;
    },
    next(state, payload) {
        // payload.posts.data.map(item => item.isReadMore = false)

        let fileredposts = payload.posts.data.filter(item=>{
            return state.posts.data.find(e=>e.id==item.id)?false:true;
        })
        state.posts = {
            ...payload.posts,
            data: [...state.posts.data, ...fileredposts]
        };
    },
    next2(state, payload) {
        // payload.posts.data.map(item => item.isReadMore = false)
        let fileredposts = payload.posts.data.filter(item=>{
            return state.ownedposts.data.find(e=>e.id==item.id)?false:true;
        })

        state.ownedposts = {
            ...payload.posts,
            data: [...state.ownedposts.data, ...fileredposts]
        };
    },
    addReadMore(state, payload) {
        const index = state.posts.data.findIndex(item => item.id == payload.id);
        state.posts.data[index].isReadMore = false
    },
    setReadMore(state, payload) {
        const index = state.posts.data.findIndex(item => item.id == payload.id);
        state.posts.data[index].isReadMore = true
    },
    setSize(state, payload) {
        const index = state.posts.data.findIndex(item => item.id == payload.id);
        state.posts.data[index].size = payload.size
    }
};

// Actions
const actions = {
    index({ commit}) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/studentpost`)
                .then(res => {
                    commit("set", { posts: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    index2({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/ownstudentpost`)
                .then(res => {
                    commit("set2", { posts: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    store({ commit, rootGetters }, access) {
        return new Promise((resolve, reject) => {
            // console.log(access)
            axios
                .post(`${this.state.Setting.url}/api/v1/post`, access, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(res => {
                    commit("add", { post: res.data });
                    let auth=rootGetters["Auth/auth"];
                    if(auth.id==res.data.author_id.id){
                        commit("add2", { post: res.data });
                    }
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    update({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let access = {
                _method: 'put',
                ...payload
            }
            axios.post(`${this.state.Setting.url}/api/v1/post/${payload.id}`, access).then(res => {
                commit('update', res.data)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    show({ commit }, id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/post/${id}`)
                .then(res => {
                    commit("setComment", res.data.comments );
                    resolve(res);
                    
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    next({ commit, state }) {
        return new Promise((resolve, reject) => {
            // console.log(state.posts.next_page_url);
            axios
                .get(`${state.posts.next_page_url}`)
                .then(res => {
                    commit("next", { posts: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    next2({ commit, state }) {
        return new Promise((resolve, reject) => {
            // console.log(state.posts.next_page_url);
            axios
                .get(`${state.ownedposts.next_page_url}`)
                .then(res => {
                    commit("next2", { posts: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    prev() {},
    page() {},
    destroy({ commit }, id) {
        return new Promise((resolve, reject) => {
            let access = {
                _method: "delete"
            };
            axios
                .post(`${this.state.Setting.url}/api/v1/post/${id}`, access)
                .then(res => {
                    commit("remove", { id: id });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    like({ commit }, id) {
        return new Promise((resolve, reject) => {
            const access = {
                post_id: id
            };
            axios
                .post(`${this.state.Setting.url}/api/v1/postlike`, access)
                .then(res => {
                    commit("addLikes",res.data);
                    commit("addLiked",res.data);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    dislike({ commit }, id) {
        return new Promise((resolve, reject) => {
            const access = {
                _method: "delete"
            };
            axios
                .post(`${this.state.Setting.url}/api/v1/postlike/${id}`, access)
                .then(res => {
                    commit("removeLikes",res.data);
                    commit("removeLiked",res.data);
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
/* Module1.store.js */
import axios from 'axios'
// State object
const state = {
    //url: 'https://agpaiidigital.org',
    storageUrl: 'https://S3.wasabisys.com/agpaiidigital.org',
    url: process.env.DEV ? 'http://localhost:8000' : 'https://agpaiidigital.org',
    // storageUrl: 'http://localhost:8000/storage',
    assets: {
        bgToolbar: 'statics/bg-toolbar.jpeg'
    },
    navigation:false,
}

// Mutations
const mutations = {
    toggleNavigation(state){
        state.navigation=!state.navigation
    }

}

// Actions
const actions = {
    toggleNavigation({ commit }){
        commit("toggleNavigation");
        //return true;
    }
}

// Getter functions
const getters = {
    url: state => state.url
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
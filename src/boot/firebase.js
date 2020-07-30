import firebase from 'firebase'
import Vue from 'vue'
import { firestorePlugin } from 'vuefire'


var firebaseConfig = {
  apiKey: "AIzaSyCNowI3Nyk-WGu4J0Dl7H-WVyjGmxUq84w",
  authDomain: "agpaiidigital-kta.firebaseapp.com",
  databaseURL: "https://agpaiidigital-kta.firebaseio.com",
  projectId: "agpaiidigital-kta",
  storageBucket: "agpaiidigital-kta.appspot.com",
  messagingSenderId: "488917299279",
  appId: "1:488917299279:web:9b97c9e732504606533a3a",
  measurementId: "G-Y7C6C81MGS"
};
  firebase.initializeApp(firebaseConfig);
  Vue.use(firestorePlugin)
  export default ({ app, router, store, Vue }) => {
    // Vue.use(VueFire)
    Vue.prototype.$firebase = firebase
  }
  // firebaseApp.firestore().settings({timestampsInSnapshots : true})
  // firebase.analytics();

// export default firebaseApp.firestore();

// export default ({ app, router, store, Vue }) => {
//   Vue.use(VueFire)
//   Vue.prototype.$firebase = firebase

//   firebase.auth().onAuthStateChanged(user => {
//    // Any logic you might want run when the user state changes
//   })

//   router.beforeEach((to, from, next) => {
//     let currentUser = firebase.auth().currentUser
//     let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//     console.log('to', to, 'from', from)
//     if (requiresAuth && !currentUser && to.path !== '/login') {
//       console.log('Needs to be logged in .. redirecting to login')
//       next('login')
//     }
//     next()
//   })
// }
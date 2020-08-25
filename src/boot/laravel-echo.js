import VueEcho from "vue-echo-laravel";
import Vue from "vue";
//import Echo from "laravel-echo"
import store from "./../store";
const token = store().getters["Auth/token"];
const url = store().getters["Setting/url"];


//window.io = require("socket.io-client");
window.Pusher = require('pusher-js');

Vue.prototype.$connect = (token)=>{
    return new Promise((resolve, reject)=>{
        if (!Vue.prototype.$echo && token.token_type!=null) {
            console.log('token')
            console.log(token.token_type)
            Vue.use(VueEcho, {
              //broadcaster: "socket.io",
              broadcaster: "pusher",
              key:"3fa4f5ea1c2d2c09d457",
              //host: "http://localhost:8000",
              authEndpoint: url+'/broadcasting/auth',
              cluster:'ap1',
              forceTLS: true,
              auth: {
                headers: { 
                  Authorization: `${token.token_type} ${token.access_token}`
                }
              }
            });
          }else{
              console.log('token kosong')
          }
          resolve('konek gan')
    })
    // if (token.access_token) {
    //     console.log('token')
    //     console.log(token.token_type)
    //     Vue.use(VueEcho, {
    //       //broadcaster: "socket.io",
    //       broadcaster: "pusher",
    //       key:"3fa4f5ea1c2d2c09d457",
    //       //host: "http://localhost:8000",
    //       authEndpoint: url+'/broadcasting/auth',
    //       cluster:'ap1',
    //       forceTLS: true,
    //       auth: {
    //         headers: { 
    //           Authorization: `${token.token_type} ${token.access_token}`
    //         }
    //       }
    //     });
    //   }else{
    //       console.log('token kosong')
    //   }
    //   return "asu";      
}

Vue.prototype.$connect(token);
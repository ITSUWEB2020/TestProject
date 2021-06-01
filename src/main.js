// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from "firebase/app";
import "firebase/firestore";
import axios from "axios";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false


Vue.config.productionTip = false
var firebaseConfig = {
  apiKey: "AIzaSyDjkGZLgGi8C_xaofcWwIzMYS-Viv-Pguk",
  authDomain: "snack-app-c25f1.firebaseapp.com",
  projectId: "snack-app-c25f1",
  storageBucket: "snack-app-c25f1.appspot.com",
  messagingSenderId: "484063817264",
  appId: "1:484063817264:web:abc083b99fa9a2a1b807f5",
  measurementId: "G-NXGQYL7M1S"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

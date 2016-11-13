import Vue from "vue";
import VueRouter from 'vue-router'

import App from './app.vue'
import Radio from './components/radio.vue'
import Streams from './components/streams.vue'

//import App from "./app.vue";
import streams from "./streams.js";
localStorage.setItem("streams", JSON.stringify(streams))

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Radio },
    { path: '/streams', component: Streams }
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    router: router,
    el: '#app',
    render: h => h(App)
})

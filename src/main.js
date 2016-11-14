import Vue from "vue";
import VueRouter from "vue-router";
import App from "./app.vue";
import Radio from "./components/radio.vue";
import Streams from "./components/streams.vue";
import Error from "./components/error.vue";
import streams from "./streams.js";

Vue.use(VueRouter)

// just testing
localStorage.setItem("streams", JSON.stringify(streams))

const routes = [
    {path: '/', component: Radio},
    {path: '/streams', component: Streams},
    {path: '*', component: Error}
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    router: router,
    el: '#app',
    render: h => h(App)
})

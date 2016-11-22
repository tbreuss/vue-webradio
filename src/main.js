// http://stackoverflow.com/questions/38616167/communication-between-sibling-components-in-vuejs-2-0/40442986#40442986

import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import Vuex from 'vuex'
import App from "./app.vue";
//import Radio from "./components/radio.vue";
import Player from "./components/player.vue";
import MyStreams from "./components/mystreams.vue";
import Streams from "./components/streams.vue";
import Error from "./components/error.vue";
//import streams from "./streams.js";

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

Vue.http.options.root = 'http://radio.tebe.ch';

const store = new Vuex.Store({
    state: {
        count: 0,
        stream: {
            id: -1,
            name: '',
            url: '',
            isPlaying: true
        }
    },
    mutations: {
        increment (state) {
            state.count++
        },
        stream (state, stream) {
            if (typeof stream !== "undefined") {
                state.stream = {
                    id: stream.id,
                    name: stream.name,
                    url: stream.url,
                    isPlaying: true
                }
            } else {
                state.stream.isPlaying = false
            }
        }
    }
})

Vue.component('player', Player)

const eventHub = new Vue()

// Distribute to components using global mixin
Vue.mixin({
    data: function () {
        return {
            eventHub: eventHub
        }
    }
})

// just testing
//localStorage.setItem("streams", JSON.stringify(streams))

const routes = [
    {path: '/streams', component: Streams},
    {path: '/mystreams', component: MyStreams},
    {path: '/', redirect: '/streams'},
    {path: '*', component: Error}
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
})

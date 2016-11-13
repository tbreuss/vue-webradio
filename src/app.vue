<template>
    <div id="app">
    <h1>Web-Radio</h1>
    <p>
        <router-link to="/">Radio</router-link>
        <router-link to="/streams">Streams</router-link>
    </p>
    <router-view></router-view>
        </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'Hello Vue!'
            }
        }
    }
</script>

<template>
    <div id="app">
    <h1>Jazz-Radio</h1>
    <p>
        <router-link to="/">Radio</router-link>
        <router-link to="/streams">Streams</router-link>
    </p>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
        </div>
</template>

<script>
    export default {
        data () {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                msg: 'Hello Vue!'
            }
        }
    }
</script>

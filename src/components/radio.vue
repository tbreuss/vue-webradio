<template>
    <div id="app">
        <div v-if="stream">
            <div class="stream">
                <label for="stream">Stream</label>
                <select v-model="stream" id="stream" @change="playStream">
                    <option v-for="stream in streams" :value="stream.url">
                        {{ stream.name }}
                    </option>
                </select>
            </div>
            <div class="volume">
                <label for="volume">Volume</label>
                <input @input="setVolume" @change="setVolume" v-model="volume" type="range" min="0" max="100"
                       :value="volume" id="volume"/>
            </div>
            <div class="button">
                <button v-if="playing" @click="stopStream">Stop</button>
                <button v-else @click="playStream">Play</button>
            </div>
        </div>
        <div v-else>
            <p>Bitte mindestens eine
                <router-link to="/streams">Stream-URL</router-link>
                erfassen.
            </p>
        </div>
    </div>
</template>

<script>

// https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/Cross-browser_audio_basics

let audio = new Audio()

audio.addEventListener("loadstart", function() {
    //console.log("load start event")
});
audio.addEventListener("timeupdate", function() {
    //console.log("time update event")
});

audio.addEventListener("volumechange", function() {
    //console.log("volume change event")
})
audio.addEventListener("progress", function() {
    //console.log("progress event")
});

export default {
  name: 'radio',
  data () {
    return {
      playing: false,
      stream: '',
      streams: JSON.parse(localStorage.getItem("streams")), //this.$parent.streams,
      volume: 70
    }
  },
  created: function() {
    if (this.streams.length > 0) {
        this.stream = this.streams[0].url
    }
  },
  methods: {
    playStream: function(event) {
        if (this.stream == '') {
            console.log('please choose a stream')
            return
        }
        console.log('play ' + this.stream)
        audio.setAttribute('src', this.stream)
        audio.currentTime = 0
        audio.volume = this.calculateVolume()
        audio.play()
        this.playing = true
    },
    stopStream: function(event) {
        if (audio.getAttribute('src') != '') {
            audio.pause()
            audio.setAttribute('src', '')
            this.playing = false
            console.log('stop')
        }
    },
    setVolume: function(event) {
        audio.volume = this.calculateVolume()
        console.log('set volume to ' + this.calculateVolume());
    },
    calculateVolume: function() {
        return this.volume / 100
    }
  }
}

</script>

<style scoped>
</style>

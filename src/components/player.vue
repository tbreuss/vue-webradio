<template>
    <footer class="mdl-mini-footer">
        <div v-if="true" style="border:1px solid white;width:100%;padding:15px 30px">
            <div>&nbsp;{{ stream.name }}&nbsp;</div>
            <div>
                <input @input="setVolume" @change="setVolume" v-model="volume" type="range"
                       min="0" max="100" :value="volume" id="volume" class="mdl-slider mdl-js-slider">
            </div>
            <div>
                <audio id="audio">
                    <source :src="stream.url" type="audio/mpeg">
                    <source :src="stream.url" type="audio/mpegURL" />
                </audio>
                <button v-if="true == stream.isPlaying && stream.id > 0" @click="stopStream">Stop</button>
                <button v-if="false == stream.isPlaying" @click="playStream">Play</button>
            </div>
        </div>
    </footer>
</template>

<script>

// https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/Cross-browser_audio_basics

export default {
  name: 'player',
  data: function() {
    return {
      volume: 70
    }
  },
  created: function() {
    this.eventHub.$on('player.play', data => {
        console.log(data)
        this.$store.commit('stream', data)
        if (this.stream.url != '') {
            let audio = document.getElementById('audio')
            audio.setAttribute('src', this.stream.url)
            audio.currentTime = 0
            audio.volume = this.calculateVolume()
            const p = audio.play()
            if (p && (typeof Promise !== 'undefined') && (p instanceof Promise)) {
                p.catch((e) => {
                    /*
                    if (e.name === 'NotAllowedError') {
                        eventBus.trigger(Events.PLAYBACK_NOT_ALLOWED);
                    }
                    log(`Caught pending play exception - continuing (${e})`);
                    */
                    console.log(e)
                });
            }
        }
    })
    this.eventHub.$on('player.stop', data => {
        this.$store.commit('stream')
        let audio = document.getElementById('audio')
        audio.setAttribute('src', '')
        const p = audio.pause()
        if (p && (typeof Promise !== 'undefined') && (p instanceof Promise)) {
            p.catch(e => log(e));
            console.log(p)
        }
    })
  },
  computed: {
    stream: function() {
        return this.$store.state.stream
    }
  },
  methods: {
    playStream: function() {
        if (this.stream.url != '') {
            this.eventHub.$emit('player.play', this.stream)
        }
    },
    stopStream: function() {
        this.eventHub.$emit('player.stop')
    },
    setVolume: function(event) {
        let audio = document.getElementById('audio')
        audio.volume = this.calculateVolume()
    },
    calculateVolume: function() {
        return this.volume / 100
    }
  }
}

</script>

<style scoped>
/*
.fade-enter-active, .fade-leave-active {
  transition: opacity 2.5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
*/
</style>

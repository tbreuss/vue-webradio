<template>
    <div id="streams">

        <h3>Streams</h3>

        <input v-model="term" @keyup.enter="fetchStreams(1)" placeholder="Suche...">

        <table v-if="streams.length>0" class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
            <thead>
                <tr>
                    <th class="mdl-data-table__cell--non-numeric">Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stream in streams">
                    <td class="mdl-data-table__cell--non-numeric">{{ stream.name }}</td>
                    <td class="buttons">
                        <div class="song-indicator" data-playback-status="playing"></div>
                        <button :class="{ 'mdl-button-inactive': true == isPlaying(stream.id) }" @click="playStream(stream.id)"
                                class="mdl-button mdl-js-button mdl-button--raised">Play
                        </button>
                        <button :class="{ 'mdl-button-inactive': false == isPlaying(stream.id) }" @click="stopStream(stream.id)"
                                class="mdl-button mdl-js-button mdl-button--raised">Stop
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="pagination.pageCount==0 && term!=''">
            <p>Mit dem angegebenen Suchbegriff wurden keine Streams gefunden.</p>
            <p>Vorschläge:<br>
                Achte darauf, dass alle Wörter richtig geschrieben sind.<br>
                Probiere es mit anderen Suchbegriffen.<br>
                Probiere es mit allgemeineren Suchbegriffen.
            </p>
        </div>

        <div v-if="pagination.pageCount>0" class="pagination">
            <div class="mdl-grid">
                <div class="mdl-cell mdl-cell--3-col" style="text-align:left">
                    <div v-if="pagination.currentPage > 1">
                        <button @click="fetchStreams(prevPage)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                            &lt; Prev
                        </button>
                    </div>
                </div>
                <div class="mdl-cell mdl-cell--6-col" style="text-align:center">
                    Seite {{ pagination.currentPage }} von {{ pagination.pageCount}}
                </div>
                <div class="mdl-cell mdl-cell--3-col" style="text-align:right">
                    <div v-if="pagination.currentPage < pagination.pageCount">
                        <button @click="fetchStreams(nextPage)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                            Next &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {
  name: 'streams',
  data () {
    return {
      pagination: {
        currentPage: 1,
        pageCount: 0,
        perPage: 20,
        totalCount: 0
      },
      streams: [],
      term: ''
    }
  },
  created: function() {
    this.fetchStreams(1)
  },
  computed: {
    selected: function() {
        return this.$store.state.stream
    },
    nextPage: function() {
        return this.pagination.currentPage + 1
    },
    prevPage: function() {
        return this.pagination.currentPage - 1
    }
  },
  methods: {
    isPlaying: function(id) {
        return (this.selected.id == id) && this.selected.isPlaying
    },
    fetchStreams: function(page) {
        let url = 'streams';
        let data = {
            term: this.term,
            page: page
        }
        this.$http.get(url, { params: data }).then(function (streams) {
            this.streams = streams.body
            this.pagination = {
                currentPage: parseInt(streams.headers.get('X-Pagination-Current-Page')),
                pageCount: parseInt(streams.headers.get('X-Pagination-Page-Count')),
                perPage: parseInt(streams.headers.get('X-Pagination-Per-Page')),
                totalCount: parseInt(streams.headers.get('X-Pagination-Total-Count'))
            }
        })
    },
    playStream: function(id) {
        this.$http.get('streams/' + id).then(function(response) {
            this.eventHub.$emit('player.play', response.body)
        })
    },
    stopStream: function(id) {
        this.eventHub.$emit('player.stop')
    }
  }
}

</script>

<style scoped>
</style>

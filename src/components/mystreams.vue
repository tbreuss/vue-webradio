<template>
    <div id="mystreams">

        <h3>Streams</h3>

        <!-- Form -->
        <div v-if="mode=='FORM'">

            <div class="mdl-textfield mdl-js-textfield">
                <input class="mdl-textfield__input" type="text" pattern="[0-9]*" id="phone">
                <label class="mdl-textfield__label" for="phone">Phone</label>
                <span class="mdl-textfield__error">Digits only</span>
            </div>

            <div class="mdl-textfield mdl-js-textfield">
                <input class="mdl-textfield__input" v-model="stream.name" :value="name" type="text" id="stream_name">
                <label class="mdl-textfield__label" for="stream_name">Name</label>
            </div>

            <div class="mdl-textfield mdl-js-textfield">
                <input class="mdl-textfield__input" v-model="stream.url" :value="url" type="text" id="stream_url">
                <label class="mdl-textfield__label" for="stream_url">Name</label>
            </div>

            <div class="buttons">
                <button v-if="index < 0" @click="insert" class="mdl-button mdl-js-button mdl-button--raised">Insert</button>
                <button v-else @click="update" class="mdl-button mdl-js-button mdl-button--raised">Update</button>
                <button @click="cancel" class="mdl-button mdl-js-button mdl-button--raised">Cancel</button>
            </div>

        </div>

        <!-- List -->
        <div v-if="mode=='LIST'">

            <p>
            <button @click="form(-1)" class="mdl-button mdl-js-button mdl-button--raised">Add</button>
            <button @click="download" class="mdl-button mdl-js-button mdl-button--raised">Download</button>
            <input id="file" type="file" accept="text/csv" @change="upload" class="mdl-button mdl-js-button mdl-button--raised">
            </p>

            <table v-if="streams.length>0" class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                <tr>
                    <th class="mdl-data-table__cell--non-numeric">Name</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(stream, index) in streams">
                    <td class="mdl-data-table__cell--non-numeric">{{ stream.name }}</td>
                    <td class="buttons">
                        <button @click="form(index)" class="mdl-button mdl-js-button mdl-button--raised">Update</button>
                        <button @click="remove(index)" class="mdl-button mdl-js-button mdl-button--raised">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>

    </div>
</template>

<script>

export default {
  name: 'mystreams',
  data () {
    return {
      mode: 'LIST',
      index: -1,
      stream: {},
      streams: JSON.parse(localStorage.getItem("streams")),
    }
  },
  created: function() {
  },
  methods: {
    insert: function() {
        this.streams.push(this.stream)
        this.stream = {}
        this.mode = 'LIST'
    },
    cancel: function() {
        this.stream = {}
        this.mode = 'LIST'
    },
    update: function() {
        this.streams[this.index] = this.stream
        this.stream = {}
        this.mode = 'LIST'
    },
    form: function(index) {
        this.index = index
        if (this.streams[index] !== undefined) {
            this.stream = this.streams[index]
        }
        this.mode = 'FORM'
    },
    remove: function(index) {
        this.streams.splice(index, 1);
    },
    download: function() {
        let csv = 'data:text/csv;charset=utf-8,'
        this.streams.forEach(function(item) {
            csv += item.name + ';' + item.url + "\n"
        })
        let link = document.createElement('a')
        link.setAttribute('href', encodeURI(csv))
        link.setAttribute('download', 'webradio-streams.csv')
        link.click()
    },
    upload: function(event) {
        let file = event.target.files[0];
        let reader = new FileReader()
        var streams = this.streams
        reader.onload = function(event) {
            event.target.result.split("\n").forEach(function(line) {
                let item = line.split(";")
                if (item.length == 2) {
                    let stream = {
                        name: item[0],
                        url: item[1]
                    }
                    streams.push(stream)
                }
            })
        }
        reader.readAsText(file)
        event.target.value = ''
    }
  }
}

</script>

<style scoped>
</style>

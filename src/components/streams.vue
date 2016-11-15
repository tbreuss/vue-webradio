<template>
    <div id="streams">
        <!-- Form -->
        <div v-if="mode=='FORM'">
            <div class="stream_name">
                <label for="stream_name">Name</label>
                <input v-model="stream.name" type="input" :value="name" id="stream_name"/>
            </div>
            <div class="stream_url">
                <label for="stream_url">URL</label>
                <input v-model="stream.url" type="input" :value="url" id="stream_url"/>
            </div>
            <div class="buttons">
                <button v-if="index < 0" @click="insert">Insert</button>
                <button v-else @click="update">Update</button>
                <button @click="cancel">Cancel</button>
            </div>
        </div>
        <!-- List -->
        <div v-if="mode=='LIST'">
            <button @click="form(-1)">Add</button>
            <button @click="download">Download</button>
            <input id="file" type="file" accept="text/csv" @change="upload">
            <table v-if="streams.length>0" class="stream" border="1">
                <tr v-for="(stream, index) in streams">
                    <td>{{ stream.name }}</td>
                    <td class="buttons">
                        <button @click="form(index)">Update</button>
                        <button @click="remove(index)">Delete</button>
                    </td>
                </tr>
            </table>
        </div>

    </div>
</template>

<script>

export default {
  name: 'streams',
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

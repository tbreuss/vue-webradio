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
    }
  }
}

</script>

<style scoped>
</style>

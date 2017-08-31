<template>
  <section class="container">
    <h1 class="title">
      Client <br>
      <input type="text" v-model="text">
      <button @click="search()">+</button>
    </h1>
    <ul class="users">
      <li v-for="(src, index) in list" :key="src.id.videoId" class="user">
       ชื่อเรื่อง  {{ src.snippet.title }} <br>
       รหัสวิดิโอ  {{ src.id.videoId }} <br>
       <img :src="src.snippet.thumbnails.high.url" @click="submitForm(src)">
       <hr>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import io from 'socket.io-client'
// const socket = io()

export default {
  head () {
    return {
      title: 'Cilent'
    }
  },
  data () {
    return {
      text: '',
      list: [],
      socket: null
    }
  },
  async mounted () {
    this.socket = await io.connect()
  },
  methods: {
    search () {
      axios.get(`/api/query?query=${this.text}`).then((res) => {
        this.list = res.data.items
      })
    },
    submitForm (src) {
      this.socket.emit('add-list', `Hello`)
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>

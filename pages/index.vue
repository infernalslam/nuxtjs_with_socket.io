<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content">
          Client <br>
          <el-input
          placeholder="Search clip"
          icon="search"
          v-model="text" />
          <el-button type="primary" @click="search()">Search</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <ul class="users">
          <li v-for="(src, index) in list" :key="src.id.videoId" class="user">
           ชื่อเรื่อง  {{ src.snippet.title }} <br>
           รหัสวิดิโอ  {{ src.id.videoId }} <br>
           <img :src="src.snippet.thumbnails.high.url" @click="submitForm(src)">
           <hr>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
  <!-- <section class="container">
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
  </section> -->
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
      let data = {
        id: src.id.videoId,
        title: src.snippet.title,
        img: src.snippet.thumbnails.high.url
      }
      this.socket.emit('add-list', data)
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

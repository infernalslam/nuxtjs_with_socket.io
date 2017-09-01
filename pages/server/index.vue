<template>
<div>
  <section class="container">
    <h1 class="title">
      Server
    </h1>
    <ul class="users">
    <div v-for="(src, i) in data" :key="src.id">
       ชื่อเรื่อง  {{ src.title }} <br>
       รหัสวิดิโอ  {{ src.id }} <br>
       <img :src="src.img">
       <hr>
    </div>
    </ul>
  </section>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  head () {
    return {
      title: 'Server'
    }
  },
  data () {
    return {
      socket: null,
      data: []
    }
  },
  async mounted () {
    this.socket = await io.connect()
    this.socket.on('now-playlist', (res) => {
      this.data = res
    })
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

<template>
  <div>
     {{ ip }} :3000
      <youtube :video-id="id" player-width="1280" player-height="750" :player-vars="{autoplay: 1}"></youtube>
  </div>
</template>

<script>
import io from 'socket.io-client'
import axios from '~/plugins/axios'
export default {
  head () {
    return {
      title: 'Server'
    }
  },
  data () {
    return {
      socket: null,
      id: '',
      ip: ''
    }
  },
  async mounted () {
    console.log('test')
    this.socket = await io.connect()
    this.socket.on('now-playlist', (res) => {
      this.id = res.id
    })
    axios.get('/api/route').then((res) => {
      this.ip = res.data
    })
  }
}
</script>

<style scoped>
iframe {
position: fixed;
right: 0;
bottom: 0;
min-width: 100%;
min-height: 100%;
width: auto;
height: auto;
z-index: -100;
/*background: url('/assets/images/polina.jpg') no-repeat;*/
background-size: cover;
}
</style>

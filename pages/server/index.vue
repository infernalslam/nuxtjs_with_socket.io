<template>
  <div>
    <div>
      <div v-if=" id === '' ">
        {{ ip }} :3000
      </div>
        <iframe v-if=" id !== '' "
          width="420"
          height="315"
          :src=" 'https://www.youtube.com/embed/' + id + '?autoplay=1' "
          frameborder="0"
          allowfullscreen />
    </div>
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

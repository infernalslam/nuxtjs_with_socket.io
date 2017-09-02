<template>
  <div>
    <div>
        <iframe
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
export default {
  head () {
    return {
      title: 'Server'
    }
  },
  data () {
    return {
      socket: null,
      // data: [],
      id: '4OrCA1OInoo'
    }
  },
  async mounted () {
    this.socket = await io.connect()
    this.socket.on('now-playlist', (res) => {
      this.id = res.id
      console.log(this.id)
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

<!-- <youtube id="youtube" :video-id="id" :player-vars="{autoplay: 1}" :player-width="1440" :player-heigh="900"  ></youtube> -->

<!-- <div class="container">
  <youtube :video-id="id" :player-vars="{autoplay: 1}"   player-width="100%" player-heigh="100%" ></youtube>
</div> -->

<!--<section class="container">
  <h1 class="title">
    Server
  </h1>
  <div><youtube :video-id="id" :player-vars="{autoplay: 1}"></youtube></div>
  <ul class="users">
  <br>
  LIST :
  <div v-for="(src, i) in data" :key="src.id">
     ชื่อเรื่อง  {{ src.title }} <br>
     รหัสวิดิโอ  {{ src.id }} <br>
     <img :src="src.img">
     <hr>
  </div>
  </ul>
</section> -->
<!-- <div>
  <nav class="container">
      <ul>
        <li><a href="#">London</a></li>
        <li><a href="#">Paris</a></li>
        <li><a href="#">Tokyo</a></li>
      </ul>
    </nav>
  <div class="youtubesize">
      <youtube  class="youtubesize" :video-id="id" :player-vars="{autoplay: 1}"></youtube>
  </div>
</div> -->

<!-- <div style="position: fixed; z-index: -99; width: 100%; height: 100%">
     <iframe frameborder="0" height="100%" width="100%"
       src="https://youtube.com/embed/ID?autoplay=1&controls=0&showinfo=0&autohide=1">
     </iframe>
</div> -->

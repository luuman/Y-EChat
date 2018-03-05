<template>
  <div class="video">
    <video controls="true" preload="none" ref="video" :poster="Img">
      <source :src="Url" type="video/mp4">
    </video>
    <video
      id="video"
      :poster="Img"
      :src="Url"
      playsinline="playsinline"
      webkit-playsinline="webkit-playsinline"
      x-webkit-airplay="x-webkit-airplay"
      preload="none"
      miuicontrols="none"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="false">
    </video>
    <!-- <div class="show"><img ref="play" :src="Img"><div @click="Play" class="play"></div></div> -->
  </div>
</template>
<script>
  export default {
    props: {
      Img: String,
      Url: String
    },
    data () {
      return {
      }
    },
    components: {},
    methods: {
      Play () {
        this.$refs.video.play()
        let Div = document.getElementsByClassName('tvp_overlay_play')
        Div.click()
        let self = this
        setTimeout(function () {
          self.Full()
        }, 500)
      },
      Full () {
        this.$refs.play.style.display = 'none'
        this.$refs.video.webkitRequestFullScreen()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .video{
    background: #000;
    position: relative;
    video{
      height: 100%;
      width: 100%;
      z-index: 3;
    }
    .show{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      img{
        width: 100%;
      }
      .play{
        width: size(60);
        height: size(60);
        position: absolute;
        z-index: 199;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        margin-left: size(-30);
        margin-top: size(-30);
        background: rgba(255, 255, 255, 0.5);
        &::after{
          content: '';
          display: block;
          width: 0;
          height: 0;
          position: absolute;
          left: size(20);
          top: size(15);
          border-top: size(15) solid transparent;
          border-left: size(25) solid rgba(255, 255, 255, 0.5);
          border-bottom: size(15) solid transparent;
        }
      }
    }
  }
</style>

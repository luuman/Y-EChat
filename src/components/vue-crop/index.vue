<template>
  <div class="center">
      <div class="user">
        <img class="avatar" :src="src"/>
      </div>
      <vue-core-image-upload
        crop-ratio="1:1"
        :class="['pure-button','pure-button-primary','js-btn-crop']" 
        crop="local"
        :url="API"
        extensions="png,gif,jpeg,jpg"
        text="Crop Image"
        :max-file-size="5242880"
        compress="20"
        @imageuploading="imageuploading"
        @imageuploaded="crpoServerImageUploaded">
      </vue-core-image-upload>
    </div>
  </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
// import VueCoreImageUpload from 'COMPONENT/upload/vue-core-image-upload'
export default {
  props: {
    API: String,
    value: String
  },
  mounted () {
    if (this.value !== '') {
      this.src = this.value
    }
  },
  components: {
    'vue-core-image-upload': VueCoreImageUpload
  },
  data () {
    return {
      src: ''
    }
  },
  watch: {
    value (val) {
      this.src = val
    },
    src (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    imageuploaded (res) {
      console.log(res)
      if (res.errcode === 0) {
        this.src = res.data.src
      }
    },
    imageuploading () {
      this.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498019004529&di=bf4ee606976f1879d752730288ab4767&imgtype=0&src=http%3A%2F%2Fm.qqzhi.com%2Fupload%2Fimg_5_590244837D2341884716_23.jpg'
    },
    crpoServerImageUploaded (res) {
      console.log(res)
      if (res.errcode === 0) {
        if (res.data.src) {
          this.src = res.data.src
          // this.value = res.data.src
          return
        }
        this.name = res.data.name
        this.cropArgs = {
          toCropImgH: parseInt(res.data.post.toCropImgH),
          toCropImgW: parseInt(res.data.post.toCropImgW),
          toCropImgX: parseInt(res.data.post.toCropImgX),
          toCropImgY: parseInt(res.data.post.toCropImgY)
        }
        this.cropSrc = 'http://img1.vued.vanthink.cn/vued41b900045d6d44f3b32e06049621b415.png'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/scss/mixin.scss';
  .center{
    .g-core-image-upload-btn {
      position: relative;
      overflow: hidden;
    }
    .g-core-image-upload-form {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: 0;
    }
    .g-core-image-upload-container {
      position: absolute;
      background: #111;
      z-index: 900;
    }
    .g-core-image-upload-modal {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border: size(1) solid #ccc;
      z-index: 899;
    }
    .dropped {
      border: size(4) solid #ea6153;
    }
    .g-core-image-corp-container {
      z-index: 1900;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      color: #f1f1f1;
      .image-aside {
        position: absolute;
        right: size(30);
        left: size(30);
        top: size(60);
        bottom: size(20);
        text-align: center;
        img {
          max-width: 100%;
          user-select: none;
        }
      }
      .info-aside {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: size(40);
        padding-left: size(10);
        padding-right: size(10);
        background: #fefefe;
        color: #777;
      }
      .btn-groups {
        text-align: right;
        margin: size(5) 0 0;
      }
      .btn {
        display: inline-block;
        padding: 0 size(15);
        height: size(32);
        margin-left: size(15);
        background: #fff;
        border: size(1) solid #ccc;
        border-radius: size(2);
        font-size: size(13);
        color: #222;
        line-height: size(32);
        transition: all .1s ease-in;
        &:hover {
          border: size(1) solid #777;
          box-shadow: 0 size(1) size(3) rgba(0, 0, 0, 0.05);
        }
        &:active {
          background: #ddd;
        }
        &:disabled {
          background: #eee !important;
          border-color: #ccc;
          cursor: not-allowed;
        }
      }
      .btn-upload {
        background: #27ae60;
        border-color: #27ae60;
        color: #fff;
        &:hover {
          background: #2dc26c;
          border-color: #27ae60;
          box-shadow: 0 size(1) size(3) rgba(0, 0, 0, 0.05);
        }
      }
    }
  }
</style>

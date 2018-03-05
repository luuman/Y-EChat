<template>
  <div class="upImg">
    <div class="bgImg">
      <img :src="imgUrl">
      <v-svg :data="`#icon-camera`"></v-svg>
    </div>
    <input type="file" accept="image/png,image/jpg,image/jpeg" @change="onFileChange($event)"/>
  </div>
</template>
<script>
  export default {
    props: {
      value: String,
      maxImg: {
        type: Number,
        default: 2
      }
    },
    components: {
    },
    data () {
      return {
        imgUrl: ''
      }
    },
    watch: {
      value (val) {
        this.imgUrl = val
      },
      imgUrl (val) {
        this.$emit('input', val)
      }
    },
    methods: {
      onFileChange (e) {
        this.filesMsg = e.target.files || e.dataTransfer.files
        let reg = /(\.jpg|\.png|\.gif|\.jpeg|\.JPG|\.PNG|\.GIF|\.JPEG)$/
        // 检测上传的格式  //files[0] 获取上传图片的信息
        if (!this.filesMsg[0]) {
          return false
        }
        if (!reg.test(this.filesMsg[0].name)) {
          // /通过正则检测格式是否合法
          // this.$message("请上传jpg或png或gif或jpeg格式的图片")
          return false
        }
        this.imgUrl = window.URL.createObjectURL(e.target.files[0])
        console.log(window.URL.createObjectURL(e.target.files[0]))
        // let apiImg = "https://fileupload.yktour.com.cn/netty/file/upload"
        let formData = new FormData()
        formData.append('file', this.filesMsg[0])
        // HttpService.postForm(apiImg, formData, true, true)
        //   .then(data => {
        //     this.imgUrl = data.data[0].url
        //   })
        this.$emit('callback', this.imgUrl)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/scss/mixin.scss';
  .upImg {
    width: 100%;
    min-height: 100%;
    background-color: #999;
    background-image: url(../../assets/img/bg.png);
    background-repeat: no-repeat;
    background-size: size(60);
    background-position: center;
    position: relative;
    .bgImg{
      position: relative;
      height: 100%;
      width: 100%;
      img{
        width: 100%;
        vertical-align: middle;
      }
      svg{
        width: size(60);
        height: size(60);
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: size(-30);
        margin-top: size(-30);
        color: #FFF;
      }
    }
    input{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
</style>

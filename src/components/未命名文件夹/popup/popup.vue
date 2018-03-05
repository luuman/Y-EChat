<template>
  <div v-show="showValue">
    <!-- <Dialogs v-model="showValue" :mask-transition="maskTransition" :dialog-transition="dialogTransition" @on-hide="$emit('on-hide')"@on-show="">
    </Dialogs> -->
    <Dialogs></Dialogs>
    <div  @click="onClose" class="al-mask"></div>
    <div class="m-popup">
      <div class="al-title">{{name.title || title_text}}</div>
      <div class="al-dec" v-html="name.dec || title_dec"></div>
      <div class="al-btn">
        <a href="javascript:;" class="btn" @click="onHide">{{name.button_text || button_text}}</a>
      </div>
      <div class="al-bottom"></div>
    </div>
  </div>
</template>

<script>
  import Dialogs from 'COMPONENT/popup/dialog'
  export default {
    components: {Dialogs},
    props: ['name'],
    data () {
      return {
        title_text: '恭喜',
        title_dec: '消息已成功发送',
        button_text: '确定',
        url: '',
        showValue: false
      }
    },
    // bug 暂时使用定时器设置
    created () {
      var _this = this
      setInterval(function () {
        _this.showValue = _this.name.showValue
      }, 500)
    },
    updated () {
      // this.addShow()
    },
    methods: {
      onHide () {
        this.name.showValue = false
        if (this.name.url) {
          this.$router.push(this.name.url)
        }
      },
      onClose () {
        this.name.showValue = false
      },
      addShow () {
        // console.log(this.showValue)
        // this.showValue = this.name.showValue
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/scss/mixin.scss';
  .al-mask{
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .m-popup{
    position: fixed;
    z-index: 5000;
    width: size(290);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFF;
    text-align: center;
    border-radius: size(6);
    overflow: hidden;
    .al-title{
      position: relative;
      // padding: size(36) size(20) size(30);
      line-height: size(60);
      font-weight: 400;
      color: #7f0810;
      @include font-size(24px);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin: 0 size(10);
      border-bottom: 1px solid #9e9e9e;
      &:before{
        content: '';
        width: size(100);
        height: size(100);
        background: url(../../assets/img/loading.png) no-repeat;
        background-size: size(80);
        position: absolute;
        left: size(-10);
        z-index: -1;
        top: size(10);
      }
    }
    .al-dec{
      margin-top: size(10);
      padding: size(10) size(20) size(8);
      min-height: 40px;
      line-height: size(40);
      color: #000;
      position: relative;
      @include font-size(15px);
      word-wrap: break-word;
      word-break: break-all;
      span{
        color: #943036;
      }
      &:before, &:after{
        width: size(20);
        height: size(20);
        background: url(../../assets/img/zhuan.png) no-repeat;
        background-size: 80%;
        background-position: center;
        content: '';
        position: absolute;
      }
      &:after{
        left: size(10);
        transform: rotateX(180deg);
        top: 0;
      }
      &:before{
        right: size(10);
        transform: rotateZ(180deg);
        top: 0;
      }
    }
    .al-btn{
      position: relative;
      font-size: 18px;
      border: 1px solid #7d050c;
      width: size(240);
      margin: auto;
      padding: size(4);
      a{
        @include font-size(18px);
        line-height: size(40);
        border-radius: size(4);
        background: #b60714;
        color: #FFF;
        text-decoration: none;
        display: block;
      }
    }
    .al-bottom{
      height: size(20);
      position: relative;
    }
  }
.pop_toast{
  position: fixed;
  margin: 0 10px;
  width: 80%;
  z-index: 9999;
  padding: .4rem;
  display: inline-block;
  color: #FFFFFF;
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
  border-radius: .1rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  word-break: break-all;
}
// .popup {
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   // opacity: 0.5;
//   z-index: 999;
//   left: 0;
//   top: 0;
//   div{
//     position: absolute;
//     left: 50%;
//     top: 50%;
//     transform: translate(-50%,-50%);
//     width: 60%;
//     color: #FFF;
//     border-radius: 6px;
//     background: #000;
//   }
// }
</style>

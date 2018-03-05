<template>
  <VDialog class="vue-alert" v-model="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
    <div class="vue-popout">
      <div class="top" @click="index">注册登录</div>
      <div class="main">
        <div class="login">
          <ul>
            <li>
              <span class="input"><span class="name"></span>
                <input placeholder="请输入你的姓名" v-model="vaUser.uName" type="text" @change="VvName">
              </span>
            </li>
            <li>
              <span class="input"><span class="phone"></span>
                <input placeholder="请输入你的手机号" v-model="vaUser.iphone" type="text" @change="Vphone" maxlength="11">
              </span>
            </li>
            <li>
              <span class="input"><span class="code"></span>
                <input placeholder="" v-model="vaUser.code" type="text">
                <time-code class="time" :start='start' @countDown ='start=false' @click.native='sendCode'></time-code>
              </span>
            </li>
          </ul>
          <div class="join" @click="Login" :class="{nologin: !noLogin}">登录</div>
        </div>
      </div>
      <!-- <div class="footer"></div> -->
      <!-- <div @click="_onHide" class="close"></div> -->
    </div>
  </VDialog>
</template>
<script>
  import VDialog from 'COMPONENT/v-dialog/luck'
  import API from 'API'
  import {LoginCount} from 'UTIL/baidu'
  import TimeCode from 'COMPONENT/timecode/timecode'
  const ANIMATION_TIME = 800
  export default {
    props: {
      value: Boolean,
      maskTransition: {
        type: String,
        default: 'vue-mask'
      },
      dialogTransition: {
        type: String,
        default: 'vue-dialog'
      }
    },
    mounted () {
    },
    data: () => ({
      phone: '',
      // noLogin: false,
      start: false,
      vaUser: {
        iphone: '',
        uName: '',
        code: ''
      },
      showValue: false
    }),
    watch: {
      value (val) {
        this.showValue = val
      },
      showValue (val) {
        this.$emit('input', val)
      },
      buttons (val) {
        if (!val.length) {
          this.activate()
          console.log('activate')
        }
      }
    },
    computed: {
      noLogin () {
        if (this.vaUser.iphone !== '' && this.vaUser.uName !== '' && this.vaUser.code !== '') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      Login () {
        if (!this.vaUser.iphone || !this.vaUser.code) {
          window.Aalert('请将信息填写完整！')
          return
        }
        API.Register(this.vaUser.uName, this.vaUser.iphone, this.vaUser.code).then((res) => {
          if (res.flag === 20000) {
            console.log(res.msg)
            LoginCount(this.vaUser.uName)
            this.$router.push({name: 'Vote'})
            this.showValue = false
          } else {
            window.Aalert(res.msg)
          }
        }, (res) => {
          console.log(res)
        })
      },
      VvName () {},
      index () {
        this.$router.push({name: 'Index'})
      },
      sendCode () {
        if (this.start || !this.vaUser.iphone) {
          window.Aalert('请输入手机号')
          return
        }
        API.Code(this.vaUser.iphone).then((res) => {
          if (res.flag === 20000) {
            console.log(res.msg)
            this.start = true
          }
        }, (res) => {
          console.log(res)
        })
      },
      Vphone () {
        let date = this.vaUser.iphone
        let reg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!reg.test(date)) {
          // window.Aalert('手机号有误')
          return false
        }
        return true
      },
      activate: function () {
        // let self = this
        if (!this.buttons || !this.buttons.length) {
          setTimeout(() => {
            this.showValue = false
            // this._deferred.resolve()
          }, ANIMATION_TIME + Number(this.remindDuration))
        }

        // return this._deferred.promise
      },
      _onHide () {
        this.showValue = false
      }
    },
    created () {
      if (typeof this.value !== 'undefined') {
        this.showValue = this.value
      }
    },
    components: {VDialog, TimeCode}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .vue-popout{
    border: size(1) solid #2196d3;
    box-shadow: 0 0 size(10) size(1) #2196d3;
    .top{
      height: size(32);
      color: #FFF;
      @include font-size(20px);
      line-height: size(32);
      background: url(../../assets/img/top-title.png) no-repeat;
      background-size: 100%;
    }
    .login{
      .phone, .name, .code{
        width: size(40);
        height: size(40);
        position: absolute;
        background-repeat: no-repeat;
        background-position: center;
        background-size: size(20);
      }
      .phone{
        background-image: url(../../assets/img/phone.png);
      }
      .name{
        background-image: url(../../assets/img/name.png);
      }
      .code{
        background-image: url(../../assets/img/code.png);
      }
      .input{
        position: relative;
        line-height: size(40);
        display: inline-block;
        width: size(250);
        margin: size(6) auto;
        overflow: hidden;
        border-bottom: size(1) solid #e5e5e5;
        @include font-size(16px);
        input{
          background: transparent;
          width: 100%;
          line-height: size(40);
          border: none;
          color: #FFF;
          box-sizing: border-box;
          padding-left: size(40);
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
          color: #e5e5e5; 
        } 
        .time{
          position: absolute;
          right: size(10);
          background: #1077e2;
          color: #e5e5e5;
          top: size(6);
          @include font-size(16px);
          line-height: size(30);
          padding: 0 size(6);
        }
        .show{
          background: #969696;
        }
      }
    }
    .footer{
      background: #0f75e1;
      height: size(10);
      border-radius: 0 0 size(6) size(6);
    }
    .nologin{
      border: size(1) solid #969696;
      box-shadow: 0 0.08rem 0 0 #7c7c7c;
      background-image: linear-gradient(180deg, #969696 0%, #969696 60%, #969696 100%);
    }
    .join{
      width: size(120);
      margin-top: size(40);
      margin-bottom: size(40);
    }
  }
</style>

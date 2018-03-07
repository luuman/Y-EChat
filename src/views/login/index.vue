<template>
  <div class="main">
    <div class="logo">
      <img src="../../assets/img/yingkelogo.png">
    </div>
    <div class="login">
      <ul>
        <li class="top">
          <span class="input"><span class="name"></span>
            <input placeholder="输入用户名" v-model="vaUser.uName" type="text">
          </span>
        </li>
        <li>
          <span class="input"><span class="code"></span>
            <input placeholder="输入密码" v-model="vaUser.code" type="password">
          </span>
        </li>
      </ul>
      <div>记住密码</div>
      <div class="join" @click="Login" :class="{nologin: !noLogin}">登录</div>
    </div>
  </div>
</template>
<script>
  import API from 'API'
  export default {
    mounted () {
    },
    data: () => ({
      noLogin: false,
      start: false,
      vaUser: {
        uName: '',
        code: ''
      },
      showValue: false
    }),
    methods: {
      Login () {
        if (!this.vaUser.uName || !this.vaUser.code) {
          // window.Aalert('请将信息填写完整！')
          console.log('ndfdjf')
          return
        }
        API.Login(this.vaUser.uName, this.vaUser.code).then(res => {
          if (res.flag === 20000) {
            this.$router.push({name: 'Nav'})
            // window.location.reload()
          } else {
            // window.Aalert(res.msg)
          }
        }, (err) => {
          console.log(err)
        })
      }
    },
    components: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .main{
    width: size(375);
    height: 100%;
    background: url(../../assets/img/login-bg.png) no-repeat 100%;
    background-size: 100% 100%;
    .logo{
      width: 100%;
      height: size(59);
      padding-top: size(100);
      img{
        width: size(211);
        display: block;
        // height: size(15);
        margin: auto;
      }
    }
  }
  .login{
    width: size(295);
    margin: 0 size(40);
    padding-top: size(100);
    ul{
      width: 100%;
      background: #FFF;
    }
    .top{
      border-bottom: solid size(1) #e5e5e5;
    }
    .name, .code{
      width: size(40);
      height: size(40);
      position: absolute;
      background-repeat: no-repeat;
      background-position: center;
      background-size: size(20);
    }
    .name{
      background-image: url(../../assets/img/login/name.png);
    }
    .code{
      background-image: url(../../assets/img/login/code.png);
    }
    .input{
      position: relative;
      line-height: size(40);
      display: inline-block;
      width: size(250);
      // margin: size(6) auto;
      overflow: hidden;
      // border-bottom: size(1) solid #e5e5e5;
      @include font-size(16px);
      input{
        background: transparent;
        width: 100%;
        line-height: size(40);
        border: none;
        color: #999999;
        box-sizing: border-box;
        padding-left: size(40);
      }
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
        color: #999999;
      } 
    }
    .join{
      width: size(295);
      margin-top: size(40);
      margin-bottom: size(10);
      height: size(44);
      line-height: size(44);
      border-radius: size(3);
      background-color: #3e8fe6;
      @include font-size(18px);
      color: #FFF;
      text-align: center;
    }
  }
</style>

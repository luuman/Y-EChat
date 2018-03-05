<template>
  <div>
    <time-code class="sendCode" @on-send="sendOut"></time-code>
    <!--
    <div>
      onSend 发送
      props：
      in 已发送
      after 重新发送
      before 获取验证码
    </div>
    -->
    <captcha></captcha>
  </div>
</template>
<script>
  import TimeCode from 'COMPONENT/timecode'
  import captcha from 'COMPONENT/captcha'
  export default {
    data () {
      return {
      }
    },
    components: {
      'time-code': TimeCode,
      captcha
    },
    methods: {
      sendOut () {
        console.log('sendCode')
      }
    },
    mounted () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .sendCode{
    font-size: 20px;
  }
</style>

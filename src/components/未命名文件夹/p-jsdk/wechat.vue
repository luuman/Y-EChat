<template>
</template>
<script>
  import WX from 'weixin-js-sdk'
  import API from 'API'
  import {ShareCount} from 'UTIL/baidu'
  export default {
    props: {
      WXs: Object
    },
    data: () => ({
    }),
    mounted () {
      // window.JSSDK('http://test.activity.yktour.com.cn/guessing.jsp#/Vote?noLogin=true', 'fdfjdf', 'jdfjdkjfdkfj', 'http://wx.qlogo.cn/mmopen/PiajxSqBRaELnuRBK8rk3SfP3YDtdp0vtHTuEUq8XNc1LpSULwKY7iafj4muIqg7mxNWQ1SnTUnZPQibA14oTzBpg/0')
      window.JSSDK = function (oUrl, oTitle, oDesc, oImgUrl) {
        console.log('WeixinSdk')
        WX.ready(function () {
          WX.onMenuShareTimeline({
            title: oTitle,
            link: oUrl,
            imgUrl: oImgUrl,
            success: function (res) {
              window.WeiSucc()
            },
            cancel: function () {}
          })
          WX.onMenuShareAppMessage({
            title: oTitle,
            desc: oDesc,
            link: oUrl,
            imgUrl: oImgUrl,
            success: function () {
              window.WeiSucc()
            },
            cancel: function () {}
          })
          WX.onMenuShareQQ({
            title: oTitle,
            desc: oDesc,
            link: oUrl,
            imgUrl: oImgUrl,
            success: function () {
              window.WeiSucc()
            },
            cancel: function () {}
          })
          WX.onMenuShareWeibo({
            title: oTitle,
            desc: oDesc,
            link: oUrl,
            imgUrl: oImgUrl,
            success: function () {
              window.WeiSucc()
            },
            cancel: function () {}
          })
          WX.onMenuShareQZone({
            title: oTitle,
            desc: oDesc,
            link: oUrl,
            imgUrl: oImgUrl,
            success: function () {
              window.WeiSucc()
            },
            cancel: function () {}
          })
        })
      }
      window.WeiSucc = function () {
        ShareCount()
      }
      API.JSSDK().then((res) => {
        WX.config({
          debug: false,
          appId: res.data.appid,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareQZone',
            'onMenuShareWeibo']
        })
        let url = `${window.location.origin}/guessing.jsp/`
        console.log(url)
        window.JSSDK(url, '《魅力中国城》全民竞猜赢大奖！', '斗文采，拼美食，比格调，三十二城魅力大比拼，全民竞猜玩到high，三重好礼等你来抽取，更有惊喜全程在埋伏，赶紧行动吧！', 'http://image.yktour.com.cn/g1/M00/09/5F/CgAMCllLasiAQCbmAAFO8TQcf-M687.jpg')
        // window.JSSDK(this.WXs.oUrl, this.WXs.oTitle, this.WXs.oDesc, this.WXs.oImgUrl)
      }, (res) => {
        console.log('BUG Weixin JSSDK')
      })
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
</style>

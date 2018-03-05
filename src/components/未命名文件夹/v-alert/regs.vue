<template>
  <VDialog class="vue-alert" v-model="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
    <div class="vue-popout">
      <div @click="_onHide" class="top">获得后悔药</div>
      <div>
        <div class="paper"><img src="../../assets/img/reg-btn-bg.png"></div>
        <div class="title">
          恭喜您获得了<br>1瓶神奇的后悔药
        </div>
      </div>
      <!-- <div class="footer"></div> -->
      <!-- <div @click="_onHide" class="close"></div> -->
    </div>
  </VDialog>
</template>
<script>
  import VDialog from 'COMPONENT/v-dialog/luck'
  import {getLocal, setLocal} from 'UTIL/tool'
  import API from 'API'
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
    },
    methods: {
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
      Vote () {
        API.Vote(this.cityId).then((res) => {
          this.$router.push({name: 'Core'})
          let Sign = JSON.parse(getLocal('noSign'))
          Sign.isguess = 1
          setLocal('noSign', Sign)
        })
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
    components: {VDialog}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .vue-popout{
    border: size(1) solid #2196d3;
    box-shadow: 0 0 size(10) size(1) #2196d3;
    h1{
      line-height: size(60);
      color: #FFF;
      @include font-size(20px);
    }
    .time{
      line-height: size(40);
      color: #FFF;
    }
  }
  .top{
    height: size(32);
    color: #FFF;
    @include font-size(20px);
    line-height: size(32);
    background: url(../../assets/img/top-title.png) no-repeat;
    background-size: 100%;
  }
  .title{
    color: #FFF;
    line-height: size(30);
    @include font-size(20px);
    margin-bottom: size(10);
  }

</style>

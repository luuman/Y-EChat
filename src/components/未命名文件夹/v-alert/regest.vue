<template>
  <VDialog class="vue-alert" v-model="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
    <div class="vue-popout">
      <div>
        <h1>没有可用后悔药<br>快去呼朋唤友炼药吧</h1>
        <div @click="Vote" class="join">获取后悔药</div>
        <div @click="_onHide" class="time">0</div>
      </div>
      <div @click="_onHide" class="close"></div>
    </div>
  </VDialog>
</template>
<script>
  import VDialog from 'COMPONENT/v-dialog'
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
        this.$router.push({name: 'Regret'})
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
    border-radius: size(6);
    .close{
      background: url(../../assets/img/close.png);
      background-size: 100%;
      position: absolute;
      left: size(140);
      bottom: size(-40);
      width: size(20);
      height: size(20);
      z-index: 13;
    }
    h1{
      line-height: size(30);
      @include font-size(18px);
      padding: size(20) 0;
    }
    .time{
      line-height: size(40);
      color: #FFF;
    }
  }
  .join{
    width: size(90);
    height: size(30);
    line-height: size(30);
    @include font-size(14px);
    border: size(1) solid #126bb8;
    box-shadow: 0 0.08rem 0 0 #2d3b6f;
    background-image: linear-gradient(180deg, #126bb8 0%, #126bb8 60%, #126bb8 100%);
    i{
      width: size(30);
      height: size(30);
      float: left;
      display: inline-block;
      // margin-left: size(10);
      background: url(../../assets/img/laud.png) center no-repeat;
      background-size: size(15);
    }
  }
</style>

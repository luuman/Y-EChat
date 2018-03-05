<template>
  <VDialog class="vue-alert" v-model="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
    <div class="vue-popout">
      <div class="top" @click="_onHide">全民竞猜</div>
      <div class="main">
        <div v-show="types === 1">
          帮好友炼药任务已完成<br>
          想要惊喜奖品<br>
          也来参加活动吧！<br><br>

          <div class="join share" @click="open"><i></i>参加活动</div>
        </div>
        <div v-show="types === 2">
          小伙伴太热情了，TA的炼药大计已完成啦！~<br>快去发动小伙伴儿来帮自己炼药吧！~
        </div>
        <div v-show="types === 3">
          抽奖机会太淘气<br>还在路上玩耍呢<br>快去参与活动抓住它吧！<br><br>

          <div class="join share" @click="_onHide"><i></i>参加活动</div>
        </div>
      </div>
      <!-- <div class="footer"></div> -->
      <!-- <div class="close"></div> -->
    </div>
  </VDialog>
</template>
<script>
  import VDialog from 'COMPONENT/v-dialog/luck'
  const ANIMATION_TIME = 800
  export default {
    props: {
      value: Boolean,
      types: Number,
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
      _onHide () {
        this.showValue = false
      },
      open () {
        this.$router.push({name: 'Index'})
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
    .top{
      height: size(32);
      color: #FFF;
      @include font-size(20px);
      line-height: size(32);
      background: url(../../assets/img/top-title.png) no-repeat;
      background-size: 100%;
    }
    .main{
      overflow: scroll;
      padding: size(20);
      color: #FFF;
      @include font-size(14px);
      line-height: size(30);
    }
    .share{
      width: size(120);
      height: size(30);
      line-height: size(30);
      @include font-size(14px);
      margin-bottom: size(20);
      i{
        width: size(30);
        height: size(30);
        float: left;
        display: inline-block;
        // margin-left: size(10);
        background: url(../../assets/img/flag.png) center no-repeat;
        background-size: size(15);
        background-image: url(../../assets/img/join.png);
      }
    }
    .footer{
      background: #0f75e1;
      height: size(10);
      border-radius: 0 0 size(6) size(6);
    }
  }
</style>

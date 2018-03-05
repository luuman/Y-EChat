<template>
  <VDialog class="vue-alert" v-model="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
    <div class="vue-popout">
      <div @click="prize" :class="{luck: true, luckyes: type === 1, luckno: type === 2, voteyes: type === 3, voteno: type === 4, votenos: type === 5}">
        <span v-html="name"></span>
        <div class="join" v-if="type === 1">查看详情</div>
      </div>
      <div @click="_onHide" class="close"></div>
    </div>
  </VDialog>
</template>
<script>
  import VDialog from 'COMPONENT/v-dialog/luck'
  const ANIMATION_TIME = 800
  export default {
    props: {
      value: Boolean,
      type: Number,
      name: String,
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
      prize () {
        if (this.type === 1) {
          this.$router.push({name: 'Winning'})
        } else if (this.type === 2) {
          this.showValue = false
        } else if (this.type === 3) {
          this.showValue = false
          // this.$parent.
        } else if (this.type === 4) {
          this.showValue = false
          // this.$parent.
        } else if (this.type === 5) {
          this.$router.push({name: 'Regret'})
        }
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
  .vue-dialog{
    background: transparent;
  }
  .vue-popout{
    border-radius: size(6);
    .luckno{
      background: url(../../assets/img/luck0.png);
      background-size: 100%;
      background-repeat: no-repeat;
      // background-color: #000;
      margin: auto;
      width: size(240);
      height: size(290);
    }
    .luckyes{
      background: url(../../assets/img/luck2.png);
      background-size: 100%;
      background-repeat: no-repeat;
      // background-color: #000;
      margin: auto;
      width: size(240);
      height: size(390);
      span{
        color: #fed61e;
        display: block;
        padding-top: size(226);
        padding-bottom: size(20);
        @include font-size(18px);
        width: 100%;
      }
    }
    .voteyes{
      background: url(../../assets/img/vote-yes.png);
      background-size: 100%;
      background-repeat: no-repeat;
      // background-color: #000;
      margin: auto;
      width: size(300);
      height: size(390);
      span{
        color: #fed61e;
        display: block;
        padding-top: size(226);
        padding-bottom: size(20);
        @include font-size(18px);
        width: 100%;
      }
    }
    .voteno{
      background: url(../../assets/img/vote-no.png);
      background-size: 100%;
      background-repeat: no-repeat;
      // background-color: #000;
      margin: auto;
      width: size(300);
      height: size(390);
    }
    .votenos{
      background: url(../../assets/img/vote-nos.png);
      background-size: 100%;
      background-repeat: no-repeat;
      // background-color: #000;
      margin: auto;
      width: size(300);
      height: size(390);
    }
  }
</style>

<template>
  <VDialog class="vue-alert" v-model="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
    <div class="vue-popout">
      <!-- <div class="top">通知</div> -->
      <div class="main">
        <h1 v-html="name"></h1>
      </div>
      <!-- <div class="footer"></div> -->
      <div @click="_onHide" class="close"></div>
    </div>
  </VDialog>
</template>
<script>
  import VDialog from 'COMPONENT/v-dialog'
  const ANIMATION_TIME = 800
  export default {
    props: {
      name: String,
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
    .top{
      height: size(44);
      color: #FFF;
      @include font-size(20px);
      line-height: size(44);
      border-radius: size(6) size(6) 0 0;
      background: linear-gradient(135deg, #16a9f1 0%, #0f75e1 100%);
    }
    .main{
      overflow: scroll;
      padding: 0 size(20);
      h1{
        @include font-size(14px);
        line-height: size(30);
        font-weight: bold;
        padding-top: size(10);
      }
    }
    .footer{
      background: #0f75e1;
      height: size(10);
      border-radius: 0 0 size(6) size(6);
    }
  }
</style>

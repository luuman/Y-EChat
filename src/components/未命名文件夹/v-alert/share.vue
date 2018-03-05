<template>
  <VDialog class="vue-alert" v-model="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
    <div class="vue-popout">
      <div @click="prize" :class="{luck: true}"></div>
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
        // this.$router.push({name: 'Winning'})
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
    .luck{
      background: url(../../assets/img/share.png);
      background-size: 100%;
      background-repeat: no-repeat;
      margin: auto;
      width: size(180);
      height: size(290);
    }
  }
</style>

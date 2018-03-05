<template>
  <VDialog class="vue-alert" v-model="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
    <div class="vue-popout">
      <div class="top" @click="_onHide">当前票数</div>
      <div class="main">
        <div class="left">票数</div>
        <div class="right">
          <ul>
            <li v-for="Lists in list">
              <div class="name">{{Lists.cityName}}</div>
              <div class="sum"><div :style="`width:${Num(Lists.guestCount)}%`"></div></div>
              <div class="num">{{Lists.guestCount}}票</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="footer"></div> -->
      <!-- <div @click="_onHide" class="close"></div> -->
    </div>
  </VDialog>
</template>
<script>
  import VDialog from 'COMPONENT/v-dialog/luck'
  const ANIMATION_TIME = 800
  export default {
    props: {
      value: Boolean,
      list: Array,
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
      Num (count) {
        let sum = 0
        for (let i = 0; i < this.list.length; i++) {
          sum = sum + this.list[i].guestCount
        }
        let num = count / sum * 100
        return num
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
      @include font-size(16px);
      line-height: size(32);
      background: url(../../assets/img/top-title.png) no-repeat;
      background-size: 100%;
    }
    .main{
      color: #FFF;
      overflow: scroll;
      margin: size(20) size(10);
      box-sizing: border-box;
      width: 100%;
      // display: -webkit-flex;
      // display: -moz-flex;
      // display: -ms-flex;
      // display: -o-flex;
      display: flex;
      align-items: center;
      .left{
        width: size(20);
        line-height: size(30);
      }
      ul{
        width: size(260);
        li{
          width: 100%;
          display: flex;
          justify-content: space-around;
          // display: -webkit-flex;
          // display: -moz-flex;
          // display: -ms-flex;
          // display: -o-flex;
          display: flex;
          line-height: size(30);
          border-bottom: size(1) solid #aaa;
          border-left: size(1) solid #aaa;
          padding-left: size(6);
          &:last-child{
            border-bottom: 0 solid #aaa;
          }
          &:nth-child(1){
            .sum{
              div{
                background: linear-gradient(90deg, #22a9fd 0%, #07cffe 100%);
              }
            }
          }
          &:nth-child(2){
            .sum{
              div{
                background: linear-gradient(90deg, #f40f19 0%, #fd2d6c 100%);
              }
            }
          }
          &:nth-child(3){
            .sum{
              div{
                background: linear-gradient(90deg, #fb821f 0%, #e69916 100%);
              }
            }
          }
          &:nth-child(4){
            .sum{
              div{
                background: linear-gradient(90deg, #18958d 0%, #41dabc 100%);
              }
            }
          }
          .name{
            width: size(60);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .sum{
            width: 100%;
            width: size(120);
            padding-top: size(7);
            div{
              height: size(16);
              // background: #FFF;
              // margin-top: size(7);
              border-radius: size(20);
            }
            // width: size(100);
          }
          .num{
            width: size(80);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>

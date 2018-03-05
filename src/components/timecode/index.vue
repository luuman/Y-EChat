<template>
  <div ref="code" :class="{active: !showValue}" @click="open">{{time | change}}</div>
</template>
<script>
  let flag = false
  let Infoin = ''
  export default {
    mounted () {
      this.time = this.before
      Infoin = this.in
    },
    data () {
      return {
        time: '',
        showValue: true
      }
    },
    props: {
      in: {
        type: String,
        default: '已发送'
      },
      after: {
        type: String,
        default: '重新发送'
      },
      before: {
        type: String,
        default: '获取验证码'
      }
    },
    watch: {
    },
    methods: {
      open () {
        if (this.showValue) {
          this.countDown()
        }
      },
      countDown () {
        this.showValue = false
        this.$emit('on-send')
        this.time = 60
        let time = setInterval(() => {
          this.time --
          if (this.time === 0) {
            this.showValue = true
            this.time = this.after
            flag = true
            clearInterval(time)
          }
        }, 1000)
      }
    },
    filters: {
      change (value) {
        if (!value) return ''
        if (!isNaN(value)) {
          if (flag === true) {
            return `${Infoin}${value}S`
          }
          return `${Infoin}${value}S`
        } else {
          return value
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/scss/mixin.scss';
</style>

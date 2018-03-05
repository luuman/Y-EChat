<template>
  <header>
	  <div class="header">
		  <a class="back" href="javascript:history.go(-1)" ></a>
		  <span>{{titles || title}}</span>
	  </div>
  </header>
</template>

<script>
export default {
  props: ['titles'],
  data () {
    return {
      title: 'Hello Vue.js ! '
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .logo{
    width: size(50);
    margin: auto;
    display: inline-block;
  }
  .back{
  	position: absolute;
  	left: 0;
  	top: 0;
  	width: size(44);
  	height: size(44);
  	background: url("data:image/svg+xml;charset=UTF-8,<svg%20height%3D'16'%20width%3D'8'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'>%0A%20%20<path%20d%3D'M7.5%208L2.5%2013l-1.5-1.5%203.75-3.5L1%204.5l1.5-1.5%205%205z'%20%2F>%0A<%2Fsvg>%0A") no-repeat;
  	background-size: size(10);
  	background-position: size(16);

  }
  .header{
    text-align: center;
    position: relative;
    height: size(44);
    background: #b30818;
    color: #FFF;
    font-weight: bold;
    span{
      @include font-size(18px);
      line-height: size(44);
      position: relative;
      &:after{
        content: '';
        background: url(../../assets/img/logo.png) 100% 100% no-repeat;
          background-size: 100%;
        width: size(20);
        height: size(20);
        position: absolute;
        left: 0;
        margin-left: size(-30);
        margin-top: size(10);
      }
    }
  }
</style>

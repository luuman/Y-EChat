<template>
	<div class="edSlider">
		<div class="progress" :style="'width: ' + (100 - CountNum) + '%;'"></div>
		<ul>
			<li v-for="list in img" :style="'background-image:' + list + ';'">
				<img :src="list">
				<div></div>
			</li>
		</ul>
	</div>
</template>
<script>
  // import Heads from 'COMPONENT/heads'
  // import Edslider from './edslider.js'
  export default {
    components: {
    },
    props: {
      img: Array,
      count: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        CountNum: '',
        Num: 0
      }
    },
    mounted () {
      this.CountDown(this.count)
      this.setImg()
      this.$nextTick(() => {
        // var edslider = new Edslider('.mySlideshow', {
        // })
        // console.log(edslider)
      })
    },
    watch: {
    },
    methods: {
      CountDown (count) {
        this.CountNum = count * 10
        var time = setInterval(() => {
          this.CountNum--
          if (this.CountNum <= 0) {
            this.CountNum = 0
            this.CountDown(this.count)
            clearInterval(time)
            this.addNum()
            this.showImg()
          }
        }, 100)
      },
      showImg () {
        var Div = document.querySelectorAll('li')
        Div.forEach((list, index) => {
          list.style.opacity = 0
          // list.setAttribute('class', 'a-fadeout')
        })
        Div[this.Num].style.opacity = 1
        // Div[0].setAttribute('class', 'a-fadein')
      },
      addNum () {
        if (this.Num === this.img.length) {
          this.Num = 0
          console.log(this.Num)
        } else {
          this.Num++
        }
      },
      setImg () {
        var Div = document.querySelectorAll('li')
        Div.forEach((list, index) => {
          list.style.opacity = 0
          // list.setAttribute('class', 'a-fadeout')
        })
        Div[0].style.opacity = 1
        // Div[0].setAttribute('class', 'a-fadein')
      }
    },
    filters: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .edSlider{
  	width: 100%;
  	height: 100%;
  	position: relative;
  	.progress{
  		position: absolute;
  		top: 0;
  		left: 0;
  		z-index: 2;
  		height: size(3);
  		background: rgba(128,128,128,.5);
  	}
  	ul{
  		width: 100%;
  		height: 100%;
  		li{
  			// display: none;
		    width: 100%;
		    height: 100%;
		    position: absolute;
		    top: 0;
		    left: 0;
		    transition: opacity 2s;
		    z-index: 0;
		    img{
		    	width: 100%;
		    }
  		}
  	}
  }
</style>

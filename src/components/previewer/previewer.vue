<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp vux-previewer" tabindex="-1" role="dialog" aria-hidden="true">
      <!-- Background of PhotoSwipe.
           It's a separate element as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>
      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">
        <!-- Container that holds slides.
          PhotoSwipe keeps only 3 of them in the DOM to save memory.
          Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <!--  Controls are self-explanatory. Order can be changed. -->
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="Share"></button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
            <!-- element will get class pswp__preloader--active when preloader is running -->
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import UI from 'photoswipe/dist/photoswipe-ui-default'
import objectAssign from 'object-assign'

export default {
  methods: {
    init (index) {
      let options = objectAssign({
        history: false,
        shareEl: false,
        tapToClose: true,
        index: index
      }, this.options)
      this.photoswipe = new PhotoSwipe(this.$el, UI, this.list, options)
      this.photoswipe.init()
    },
    show (index) {
      this.init(index)
    },
    close () {
      this.photoswipe.close()
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/scss/mixin.scss';
  .pswp {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow: hidden;
    -ms-touch-action: none;
    touch-action: none;
    z-index: 1500;
    -webkit-text-size-adjust: 100%;
    -webkit-backface-visibility: hidden;
    outline: none;
    * {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    img {
      max-width: none;
    }
  }
  .pswp--animate_opacity {
    opacity: 0.001;
    will-change: opacity;
    -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
    transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
  }
  .pswp--open {
    display: block;
  }
  .pswp--zoom-allowed .pswp__img {
    cursor: -webkit-zoom-in;
    cursor: -moz-zoom-in;
    cursor: zoom-in;
  }
  .pswp--zoomed-in .pswp__img {
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: grab;
  }
  .pswp--dragging .pswp__img {
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: grabbing;
  }
  .pswp__bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0;
    -webkit-backface-visibility: hidden;
    will-change: opacity;
  }
  .pswp__scroll-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .pswp__container, .pswp__zoom-wrap {
    -ms-touch-action: none;
    touch-action: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }


  .pswp__container, .pswp__img {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }

  .pswp__zoom-wrap {
    position: absolute;
    width: 100%;
    -webkit-transform-origin: left top;
    -ms-transform-origin: left top;
    transform-origin: left top;
    -webkit-transition: -webkit-transform 333ms cubic-bezier(0.4, 0, 0.22, 1);
    transition: transform 333ms cubic-bezier(0.4, 0, 0.22, 1);
  }

  .pswp__bg {
    will-change: opacity;
    -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
    transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
  }
  .pswp--animated-in {
    .pswp__bg, .pswp__zoom-wrap {
      -webkit-transition: none;
      transition: none;
    }
  }
  .pswp__container, .pswp__zoom-wrap {
    -webkit-backface-visibility: hidden;
  }
  .pswp__item {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }
  .pswp__img {
    position: absolute;
    width: auto;
    height: auto;
    top: 0;
    left: 0;
  }
  .pswp__img--placeholder {
    -webkit-backface-visibility: hidden;
  }
  .pswp__img--placeholder--blank {
    background: #222;
  }
  .pswp--ie .pswp__img {
    width: 100% !important;
    height: auto !important;
    left: 0;
    top: 0;
  }
  .pswp__error-msg {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    text-align: center;
    font-size: size(14);
    line-height: size(16);
    margin-top: size(-8);
    color: #CCC;
    a {
      color: #CCC;
      text-decoration: underline;
    }
  }
  /*! PhotoSwipe Default UI CSS by Dmitry Semenov | photoswipe.com | MIT license */
    /*

      Contents:

      1. Buttons
      2. Share modal and links
      3. Index indicator ("1 of X" counter)
      4. Caption
      5. Loading indicator
      6. Additional styles (root element, top bar, idle state, hidden state, etc.)

    */
    /*
      
      1. Buttons

     */
  /* <button> css reset */

  .pswp__button {
    width: size(44);
    height: size(44);
    position: relative;
    background: none;
    cursor: pointer;
    overflow: visible;
    -webkit-appearance: none;
    display: block;
    border: 0;
    padding: 0;
    margin: 0;
    float: right;
    opacity: 0.75;
    -webkit-transition: opacity 0.2s;
    transition: opacity 0.2s;
    -webkit-box-shadow: none;
    box-shadow: none;
    &:focus, &:hover {
      opacity: 1;
    }
    &:active {
      outline: none;
      opacity: 0.9;
    }
    &::-moz-focus-inner {
      padding: 0;
      border: 0;
    }
  }

  /* pswp__ui--over-close class it added when mouse is over element that should close gallery */

  .pswp__ui--over-close .pswp__button--close {
    opacity: 1;
  }

  .pswp__button, .pswp__button--arrow--left:before, .pswp__button--arrow--right:before {
    background: url(./default-skin.png) 0 0 no-repeat;
    background-size: size(264) size(88);
    width: size(44);
    height: size(44);
  }

  @media (-webkit-min-device-pixel-ratio: 1.1), (-webkit-min-device-pixel-ratio: 1.09375), (min-resolution: 105dpi), (min-resolution: 1.1dppx) {
    /* Serve SVG sprite if browser supports SVG and resolution is more than 105dpi */
    .pswp--svg {
      .pswp__button, .pswp__button--arrow--left:before, .pswp__button--arrow--right:before {
        // background-image: url(default-skin.svg);
     
      }
      .pswp__button--arrow--left, .pswp__button--arrow--right {
        background: none;
      }
    }
  }

  .pswp__button--close {
    background-position: 0 size(-44);
  }

  .pswp__button--share {
    background-position: size(-44) size(-44);
  }

  .pswp__button--fs {
    display: none;
  }

  .pswp--supports-fs .pswp__button--fs {
    display: block;
  }

  .pswp--fs .pswp__button--fs {
    background-position: size(-44) 0;
  }

  .pswp__button--zoom {
    display: none;
    background-position: size(-88) 0;
  }

  .pswp--zoom-allowed .pswp__button--zoom {
    display: block;
  }

  .pswp--zoomed-in .pswp__button--zoom {
    background-position: size(-132) 0;
  }

  /* no arrows on touch screens */

  .pswp--touch {
    .pswp__button--arrow--left, .pswp__button--arrow--right {
      visibility: hidden;
    }
  }

  /*
    Arrow buttons hit area
    (icon is added to :before pseudo-element)
  */

  .pswp__button--arrow--left, .pswp__button--arrow--right {
    background: none;
    top: 50%;
    margin-top: size(-50);
    width: size(70);
    height: size(100);
    position: absolute;
  }

  .pswp__button--arrow--left {
    left: 0;
  }

  .pswp__button--arrow--right {
    right: 0;
  }

  .pswp__button--arrow--left:before, .pswp__button--arrow--right:before {
    content: '';
    top: size(35);
    background-color: rgba(0, 0, 0, 0.3);
    height: size(30);
    width: size(32);
    position: absolute;
  }

  .pswp__button--arrow--left:before {
    left: size(6);
    background-position: size(-138) size(-44);
  }

  .pswp__button--arrow--right:before {
    right: size(6);
    background-position: size(-94) size(-44);
  }

    /*

      2. Share modal/popup and links

     */

  .pswp__counter {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .pswp__share-modal {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: block;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: size(10);
    position: absolute;
    z-index: 1600;
    opacity: 0;
    -webkit-transition: opacity 0.25s ease-out;
    transition: opacity 0.25s ease-out;
    -webkit-backface-visibility: hidden;
    will-change: opacity;
  }

  .pswp__share-modal--hidden {
    display: none;
  }

  .pswp__share-tooltip {
    z-index: 1620;
    position: absolute;
    background: #FFF;
    top: size(56);
    border-radius: size(2);
    display: block;
    width: auto;
    right: size(44);
    -webkit-box-shadow: 0 size(2) size(5) rgba(0, 0, 0, 0.25);
    box-shadow: 0 size(2) size(5) rgba(0, 0, 0, 0.25);
    -webkit-transform: translateY(6px);
    -ms-transform: translateY(6px);
    transform: translateY(6px);
    -webkit-transition: -webkit-transform 0.25s;
    transition: transform 0.25s;
    -webkit-backface-visibility: hidden;
    will-change: transform;
    a {
      display: block;
      padding: size(8) size(12);
      color: #000;
      text-decoration: none;
      font-size: size(14);
      line-height: size(18);
      &:hover {
        text-decoration: none;
        color: #000;
      }
      &:first-child {
        /* round corners on the first/last list item */
        border-radius: size(2) size(2) 0 0;
      }
      &:last-child {
        border-radius: 0 0 size(2) size(2);
      }
    }
  }

  .pswp__share-modal--fade-in {
    opacity: 1;
    .pswp__share-tooltip {
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0);
    }
  }

  /* increase size of share links on touch devices */

  .pswp--touch .pswp__share-tooltip a {
    padding: size(16) size(12);
  }

  a {
    &.pswp__share--facebook {
      &:before {
        content: '';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        top: size(-12);
        right: size(15);
        border: size(6) solid transparent;
        border-bottom-color: #FFF;
        -webkit-pointer-events: none;
        -moz-pointer-events: none;
        pointer-events: none;
      }
      &:hover {
        background: #3E5C9A;
        color: #FFF;
        &:before {
          border-bottom-color: #3E5C9A;
        }
      }
    }
    &.pswp__share--twitter:hover {
      background: #55ACEE;
      color: #FFF;
    }
    &.pswp__share--pinterest:hover {
      background: #CCC;
      color: #CE272D;
    }
    &.pswp__share--download:hover {
      background: #DDD;
    }
  }

    /*

      3. Index indicator ("1 of X" counter)

     */

  .pswp__counter {
    position: absolute;
    left: 0;
    top: 0;
    height: size(44);
    font-size: size(13);
    line-height: size(44);
    color: #FFF;
    opacity: 0.75;
    padding: 0 size(10);
  }

    /*
      
      4. Caption

     */

  .pswp__caption {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    min-height: size(44);
    small {
      font-size: size(11);
      color: #BBB;
    }
  }

  .pswp__caption__center {
    text-align: left;
    max-width: size(420);
    margin: 0 auto;
    font-size: size(13);
    padding: size(10);
    line-height: size(20);
    color: #CCC;
  }

  .pswp__caption--empty {
    display: none;
  }

  /* Fake caption element, used to calculate height of next/prev image */

  .pswp__caption--fake {
    visibility: hidden;
  }

    /*

      5. Loading indicator (preloader)

      You can play with it here - http://codepen.io/dimsemenov/pen/yyBWoR

     */

  .pswp__preloader {
    width: size(44);
    height: size(44);
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: size(-22);
    opacity: 0;
    -webkit-transition: opacity 0.25s ease-out;
    transition: opacity 0.25s ease-out;
    will-change: opacity;
    direction: ltr;
  }

  .pswp__preloader__icn {
    width: size(20);
    height: size(20);
    margin: size(12);
  }

  .pswp__preloader--active {
    opacity: 1;
    .pswp__preloader__icn {
      /* We use .gif in browsers that don't support CSS animation */
      background: url(./preloader.gif) 0 0 no-repeat;
    }
  }

  .pswp--css_animation {
    .pswp__preloader--active {
      opacity: 1;
      .pswp__preloader__icn {
        -webkit-animation: clockwise 500ms linear infinite;
        animation: clockwise 500ms linear infinite;
      }
      .pswp__preloader__donut {
        -webkit-animation: donut-rotate 1000ms cubic-bezier(0.4, 0, 0.22, 1) infinite;
        animation: donut-rotate 1000ms cubic-bezier(0.4, 0, 0.22, 1) infinite;
      }
    }
    .pswp__preloader__icn {
      background: none;
      opacity: 0.75;
      width: size(14);
      height: size(14);
      position: absolute;
      left: size(15);
      top: size(15);
      margin: 0;
    }
    .pswp__preloader__cut {
      /* 
          The idea of animating inner circle is based on Polymer ("material") loading indicator 
           by Keanu Lee https://blog.keanulee.com/2014/10/20/the-tale-of-three-spinners.html
        */
      position: relative;
      width: size(7);
      height: size(14);
      overflow: hidden;
    }
    .pswp__preloader__donut {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: size(14);
      height: size(14);
      border: size(2) solid #FFF;
      border-radius: 50%;
      border-left-color: transparent;
      border-bottom-color: transparent;
      position: absolute;
      top: 0;
      left: 0;
      background: none;
      margin: 0;
    }
  }

  @media screen and (max-width: 1024px) {
    .pswp__preloader {
      position: relative;
      left: auto;
      top: auto;
      margin: 0;
      float: right;
    }
  }

  @-webkit-keyframes clockwise {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }


  @keyframes clockwise {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }


  @-webkit-keyframes donut-rotate {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }

    50% {
      -webkit-transform: rotate(-140deg);
      transform: rotate(-140deg);
    }

    100% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
  }


  @keyframes donut-rotate {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }

    50% {
      -webkit-transform: rotate(-140deg);
      transform: rotate(-140deg);
    }

    100% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
  }


    /*
      
      6. Additional styles

     */
  /* root element of UI */

  .pswp__ui {
    -webkit-font-smoothing: auto;
    visibility: visible;
    opacity: 1;
    z-index: 1550;
  }

  /* top black bar with buttons and "1 of X" indicator */

  .pswp__top-bar {
    position: absolute;
    left: 0;
    top: 0;
    height: size(44);
    width: 100%;
  }

  .pswp__caption, .pswp__top-bar {
    -webkit-backface-visibility: hidden;
    will-change: opacity;
    -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
    transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
  }

  .pswp--has_mouse {
    .pswp__button--arrow--left, .pswp__button--arrow--right {
      -webkit-backface-visibility: hidden;
      will-change: opacity;
      -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
      transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
    }
    .pswp__button--arrow--left, .pswp__button--arrow--right {
      visibility: visible;
    }
  }

  /* pswp--has_mouse class is added only when two subsequent mousemove events occur */

  .pswp__top-bar, .pswp__caption {
    background-color: rgba(0, 0, 0, 0.5);
  }

  /* pswp__ui--fit class is added when main image "fits" between top bar and bottom bar (caption) */

  .pswp__ui--fit {
    .pswp__top-bar, .pswp__caption {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  /* pswp__ui--idle class is added when mouse isn't moving for several seconds (JS option timeToIdle) */

  .pswp__ui--idle {
    .pswp__top-bar, .pswp__button--arrow--left, .pswp__button--arrow--right {
      opacity: 0;
    }
  }

  /*
    pswp__ui--hidden class is added when controls are hidden
    e.g. when user taps to toggle visibility of controls
  */

  .pswp__ui--hidden {
    .pswp__top-bar, .pswp__caption, .pswp__button--arrow--left, .pswp__button--arrow--right {
      /* Force paint & create composition layer for controls. */
      opacity: 0.001;
    }
  }

  /* pswp__ui--one-slide class is added when there is just one item in gallery */

  .pswp__ui--one-slide {
    .pswp__button--arrow--left, .pswp__button--arrow--right, .pswp__counter {
      display: none;
    }
  }

  .pswp__element--disabled {
    display: none !important;
  }

  .pswp--minimal--dark .pswp__top-bar {
    background: none;
  }
</style>

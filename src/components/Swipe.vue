<template>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swp-page swiper-slide"
            v-for="list in lists" :key='list.index'>
              <a class="js-no-follow" :href="list.clickUrl">
                <img class="goods-main-photo fadeIn" :src="list.image">
              </a>
            </div>
          </div>
           <div class="swiper-pagination"></div>
        </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
export default {
  props:{
    lists:{
      type: Array,
      required: true
    }
  },
  created(){

  },
  //dom结构生成插入轮播实例(依赖DOM的组建都需要在mounted处理)
  //mounted阶段可以找到vue实例的this
  mounted(){
    this.init()
  },
  methods: {
    init(){
      new Swiper('.swiper-container',{
        loop: true,
        pagination: {
        el: '.swiper-pagination',
        clickable: true,
        },
        autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        },
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows : true,
        },
      })
    }
  }
}
</script>

<style scoped>
  .swiper-slide img{
    width: 100%;
    height: 100%;
  }
</style>

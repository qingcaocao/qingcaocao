import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import Foot from 'components/Foot.vue'
import Swiper from 'components/Swipe.vue'



let {id} = qs.parse(location.search.substr(1))
let detailsTab = ['商品详情','本店成交']
new Vue({
  el: '#goods',
  data: {
    id,
    details: null,
    detailsTab,
    tabIndex: 0,
    bannerList: null,
    skuType: 1,
    isShowSku: false,
    skuNum: 1,
    isAddCart: false,
    isShowAddMsg: false,

  },
  created(){
    this.getDetails()
  },
  methods: {
    getDetails(){
      console.log(url.details)
      axios.post(url.details, {id}).then(res=>{
        console.log(res)
        this.details = res.data.data,
        this.bannerList=[],
        console.log(this.details.imgs)
        this.details.imgs.forEach(item => {
          this.bannerList.push({
            clickUrl: '',
            image: item
          })
        })
      })
    },
    changeTab(index){
      this.tabIndex = index
    },
    chooseSku(type){
      this.skuType = type
      this.isShowSku = true
    },
    changeSkuNum(num){
      if(num<0 && this.skuNum === 1) return
      this.skuNum += num
    },
    addCart(){
      axios.post(url.addCart,{
        id,
        number: this.skuNum
      }).then(res=>{
        if(res.data.status===200) {
          this.isShowSku =false
          this.isAddCart = true
          this.isShowAddMsg = true
          setTimeout(()=>{
          this.isShowAddMsg = false
          },1000)
        }
      })
    }
  },
  components: {
    Foot,
    Swiper,
  },
  filters: {
    dataPrice(Price){
        return Price.toFixed(2)
      }
  },
  watch: {
    isShowSku(val,oldVal){
      document.body.style.overflow = val ? "hidden" : "auto"
      document.querySelector('html').style.overflow = val ? "hidden" : "auto"
      document.body.style.height = val ? "100%" : "auto"
      document.querySelector('html').style.height = val ? "100%" : "auto"
    }
  }
})

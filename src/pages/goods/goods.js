import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot.vue'
import Swiper from 'components/Swipe.vue'
import qs from 'qs'


let {id} = qs.parse(location.search.substr(1))
let detailsTab = ['商品详情','本店成交']
new Vue({
  el: '#goods',
  data: {
    details: null,
    detailsTab,
    tabIndex: 0
  },
  created(){
    this.getDetails()
  },
  methods: {
    getDetails(){
      console.log(url.details)
      axios.post(url.details, {id}).then(res=>{
        console.log(res)
        this.details = res.data.data
      })
    },
    changeTab(index){
      this.tabIndex = index
    }
  },
  components: {
    Foot,
    Swiper
  },
  filters: {
    dataPrice(Price){
        return Price.toFixed(2)
      }
  }
})

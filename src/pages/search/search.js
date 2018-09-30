import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'
import qs from 'qs'

let {keyword, id} = qs.parse(location.search.substr(1))

new Vue({
  el: '.container',
  data:{
    searchList: null,
    keyword,
    isShow: false
  },
  created(){
    this.getSearchList()
  },
  methods:{
    getSearchList(){
      axios.post(url.searchList,{keyword,id}).then(res=>{
        this.searchList = res.data.lists
        console.log(this.searchList)
      })
    },
    move(){

      if(document.body.scrollTop > 100){
        this.isShow = true
        console.log('show')
      } else{
        this.isShow = false
      }
    },
    goTop(){
      // console.log('goTop')
      window.scroll(0,0)
    }
  },
  filters: {
    dataPrice(Price){
        return Price.toFixed(2)
      }
  }
})

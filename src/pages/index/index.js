import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import {InfiniteScroll,Button} from 'mint-ui'
Vue.use(InfiniteScroll)
Vue.component(Button.name, Button)

import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'


new Vue({
  el: '#yz',
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoaded: false,
    bannerLists: null
  },
  created() {
    this.getLists()
    this.getBanner()
  },
  methods:{
    getLists(){
       //判断所有数据是否加载
      if(this.allLoaded) return
      //判断是否加载中
      this.loading = true
      //请求数据
      axios.post(url.hotlists,{
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res=>{
        // console.log(res)
        //判断数据是否加载完成
        let currentLists = res.data.lists
        if(currentLists.length < this.pageSize){
          this.allLoaded = true
        }
        //拼接处理数据
        if(this.lists) {
          this.lists = this.lists.concat(currentLists)
        } else{
          this.lists = currentLists
        }
        //修改状态
        this.loading = false
        this.pageNum++
      })
    },
    getBanner(){
      axios.get(url.banner).then(res=>{
        this.bannerLists = res.data.lists
        // console.log('banner',this.bannerLists)
      })
    }
  },
  components: {
    Foot,
    Swipe
  }
})

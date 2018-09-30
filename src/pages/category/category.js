import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from  'js/api'

import Foot from 'components/Foot.vue'

new Vue({
  el: '#category',
  data: {
    topLists: null,
    topIndex: 0,
    subData: null,
    rankData: null
  },
  created() {
    this.getTopList()
    this.getSublist(0)
  },
  mounted() {
  },
  methods: {
    getTopList(){
      axios.post(url.topList).then(res=>{
        this.topLists = res.data.lists
      }).catch(
      )
    },
    getSublist(index,id){
      this.topIndex = index
      if(index===0){
        this.getRank()
      }else {
        axios.post(url.subList,{id}).then(res=>{
          this.subData = res.data.data
          console.log('subData',this.subData)
        })
      }
    },
    getRank(){
      axios.post(url.rank).then(res=>{
        this.rankData = res.data.data
        console.log(res)
      })
    },
    toSearch(list){
      location.href = `search.html?keyword=${list.name}&id=${list.id}`
    }
  },
  computed: {

  },
  components: {
    Foot
  },
  filters: {
    dataPrice(Price){
        return Price.toFixed(2)
      }
  }
})

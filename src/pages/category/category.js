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
    this.getSubList(0)
  },
  methods: {
    getTopList(){
      axios.get(url.topList).then(res=>{
        console.log('topList',res)
        this.topLists = res.data.lists
      }).catch(
      )
    },
    getSubList(index,id){
      console.log(index)
      this.topIndex = index
      if(index === 0){
        this.getRank()
        console.log('this.topIndex', this.topIndex)
      }else {
        axios.post(url.subList,{id}).then(res=>{
          this.subData = res.data.data
          console.log('subData',this.subData)
        })
      }
    },
    getRank(){
      axios.get(url.rank).then(res=>{
        this.rankData = res.data.data
        console.log('rank',res)
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

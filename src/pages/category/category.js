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
    topIndex: 0
  },
  created() {
    this.getTopList()
  },
  methods: {
    getTopList(){
      axios.post(url.topList).then(res=>{
        console.log(res)
        this.topLists = res.data.lists
      }).catch(
        console.log('err')
      )
    },
    getSublist(id,index){
      this.topIndex = index
      console.log(id)
      console.log(index)
    }
  },
  components: {
    Foot
  }
})

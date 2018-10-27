import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Cart from 'js/cartservice.js'
import fetch from 'js/fetch.js'


new Vue({
  el: '#cart',
  data: {
    cartList: null,
    total: 0,
    editingShop: null,
    editingShopindex: -1,
    removePopup: false,
    removeData: null,
    removeMsg: ''
  },
  created() {
    this.getCartList()
  },
  computed:{
    allSelected:{
      get() {
        if(this.cartList && this.cartList.length){
          return this.cartList.every(shop => {
            return shop.checked
          })
        }
        return false
      },
      set(newVal) {
        console.log(newVal);
        this.cartList.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(good => {
            good.checked = newVal
          })
        })
      }
    },
    allRemoveSelected: {
      get() {
        if(this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal){
        if(this.editingShop) {
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
      }
    },
    selectLists() {
      if(this.cartList && this.cartList.length){
        let arr = []
        let total = 0
        this.cartList.forEach(shop => {
          shop.goodsList.forEach(good => {
            if(good.checked) {
              arr.push(good)
              total += good.price * good.number
            }
          })
        })
        this.total = total
        return arr
      }
      return []
    },
    removeLists() {
      if(this.editingShop) {
        let arr=[]
        this.editingShop.goodsList.forEach(good => {
          if(good.removeChecked) {
            arr.push(good)
          }
        })
        return arr
      }
      return []
    }
  },
  methods: {
    getCartList() {
      axios.post(url.cartLists).then(res=> {
        console.log(res)
       //处理原始数据添加选中状态
       let lists = res.data.cartList
       lists.forEach(shop => {
          shop.checked = true
          shop.removeChecked = false
          shop.editing = false
          shop.editingMsg = '编辑'
          shop.goodsList.forEach(good => {
            good.checked = true
            good.removeChecked = false
          })
       })
       this.cartList = lists
      })
    },
    selectGood(shop,good) {
      console.log(good)
      let attr = this.editingShop ? "removeChecked" : "checked"
      good[attr] = !good[attr]
      shop[attr] = shop.goodsList.every(good => {
        return good[attr]
      })
    },
    selectShop(shop) {
      let attr = this.editingShop ? "removeChecked" : "checked"
      shop[attr] = !shop[attr]
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr]
      })
    },
    selectAll() {
      let attr = this.editingShop ? "allRemoveSelected" : "allSelected"
      this[attr] = !this[attr]
    },
    edit(shop,shopIndex) {
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing ? '完成' : '编辑'
      this.cartList.forEach((item,i) => {
        if(shopIndex !== i){
          item.editing = false
          item.editingMsg = shop.editing ? '' : '编辑'
        }

      })
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing ? shopIndex : -1
    },
    reduce(good) {
      if(good.number === 1) return
      // axios.post(url.cartReduce,{
      //   id: good.id,
      //   number: 1
      // }).then(res =>{
      //   good.number--
      // })
      Cart.reduce(good.id).then(res =>{
        good.number--
      })
    },
    add(good) {
      // axios.post(url.addCart, {
      //   id: good.id,
      //   number: 1
      // }).then(res => {
      //   good.number++
      // })
      Cart.add(good.id).then(res => {
        good.number++
      })
    },
    remove(shop,shopIndex,good,goodIndex) {
      this.removePopup = true
      this.removeData = {
        shop,
        shopIndex,
        good,
        goodIndex
      }
      this.removeMsg = '确定要删除该商品吗？'
    },
    removeList() {
      this.removePopup = true
      this.removeMsg = `确定将所选 ${this.removeLists.length} 个商品删除？`
    },
    removeConfirm() {
      if (this.removeMsg === '确定要删除该商品吗？') {
        let {
          shop,
          shopIndex,
          good,
          goodIndex
        } = this.removeData
        fetch(url.cartRemove,{
          id: good.id
        }).then(res => {
          shop.goodsList.splice(goodIndex,1)
          if(!shop.goodsList.length){
            this.cartList.splice(shopIndex,1)
            this.removeShop()
          }
          this.removePopup = false
        })
      } else{
        let ids = []
        this.removeLists.forEach(good =>{
          // console.log(good)
          ids.push(good.id)
        })
        axios.post(url.cartMremove,{ids}).then(res => {
          let arr =[]
          this.editingShop.goodsList.forEach(good => {
            let index = this.removeLists.findIndex(item => {
              return item.id == good.id
            })
            if(index === -1){
              arr.push(good)
            }
          })
          if(arr.length) {
            this.editingShop.goodsList = arr
          } else{
            this.cartList.splice(this.editingShopIndex,1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }
    },
    //删除商品后自动切换为非编辑状态
    removeShop() {
      this.editingShop = null
      this.editingShopindex = -1
      this.cartList.forEach(shop=>{
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    }
  },
  filters: {
    dataPrice(Price){
        return Price.toFixed(2)
      }
  },
})




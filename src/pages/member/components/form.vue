<template>
  <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model.trim='name' maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model.trim="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option
              :value="p.value"
              v-for="(p,index) in addressData.list"
              :key="index">
                {{p.label}}
              </option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option
              :value="c.value"
              v-for="(c,index) in cityList"
              :key="index">
                {{c.label}}
              </option>
            </select>
            <select class="js-county-selector" name="area_code" data-code="" v-model.trim="districtValue">
              <option value="-1">选择地区</option>
              <option
              :value="d.value"
              v-for="(d,index) in districtList"
              :key="index">
                {{d.label}}
              </option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" v-model.trim='address' maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" v-show="type==='add'">
      <div class="block-item c-blue center" @click="add()">保存</div>
    </div>
    <div class="block section js-delete block-control-btn">
      <div class="block-item c-red center" v-show="type==='edit'">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" v-show="type==='edit'">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>
<script>
import Address from 'js/addressService.js'
export default {
  data() {
    return{
      name:'',
      tel:'',
      provinceValue:-1,
      cityValue:-1,
      districtValue:-1,
      address:'',
      id:'',
      type: this.$route.query.type,
      instance: this.$route.query.instance,
      addressData: require('js/address.json'),
      cityList: null,
      districtList: null,
    }
  },
  methods:{
    add() {
      //todo做非空和合法性校验
       let { name, tel, provinceValue, cityValue, districtValue, address } = this
       let data = {name, tel, provinceValue, cityValue, districtValue, address}
       if(this.$route.query.type === 'add') {
         Address.add(data).then(res=>{
           this.$router.go(-1)
         })
       }
       if(this.$route.query.type === 'edit') {
         Address.update(data).then(res=>{
           this.$router.go(-1)
         })
       }

    }
  },
  watch: {
    provinceValue(val){
      if(val === -1) return
      let list = this.addressData.list
      let index = list.findIndex(item => {
        return item.value === val
      })
      this.cityList = list[index].children
      this.cityValue = -1
      this.districtValue = -1
    },
     cityValue(val){
      if(val === -1) return
      let list = this.cityList
      let index = list.findIndex(item => {
        return item.value === val
      })
      this.districtList = list[index].children
      this.districtValue = -1

    }
  }
}

</script>

<style scoped>
  @import './address_base.css';
  @import './address.css';
</style>



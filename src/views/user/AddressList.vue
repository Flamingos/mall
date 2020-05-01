<template>
  <div>
    <van-nav-bar title="收货地址" left-text="返回" left-arrow @click-left="goback" />
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
import {getAddress} from '@/api/api.js'
export default {
  data() {
    return {
      chosenAddressId: -1,
      addressList: []
    };
  },

  created() {
    this.loadAddress();
  },
  methods: {
    onAdd() {
      this.$router.push({ name: "AddressEdit", query: { addressId: -1 } });
    },
    onEdit(item, index) {
      this.$router.push({
        name: "address-edit",
        query: { addressId: item.id }
      });
    },
    onSelect(item, index) {
      localStorage.setItem( 'AddressId', item.id );
      this.$router.go(-1);
    },
    goback() {
      this.$router.go(-1);
    },
    loadAddress() {
      getAddress().then(res => {
        var list = res.data;
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          this.addressList.push({
            id: item.id,
            name: item.name,
            tel: item.tel,
            address: item.address
              //item.province + item.city + item.county + " " + item.addressDetail
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
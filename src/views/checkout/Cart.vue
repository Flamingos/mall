<template>
  <div>
    <section v-show="showGoods">购物车是空的。。。</section>
    <section v-show="!showGoods">
      <div class="cart-title">
        <van-button size="small" type="danger" @click="edit" plain>
          <span v-show="active">管理</span>
          <span v-show="!active">完成</span>
        </van-button>
      </div>
      <!--显示购物车中的商品-->
      <div class="cart-list">
        <van-checkbox-group v-model="selected" ref="select">
          <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
            <van-checkbox :name="item.goodsId"></van-checkbox>
            <div class="pang-img">
              <img :src="item.image" width="100%" />
            </div>
            <div class="pang-text">
              <div class="pang-goods-name">{{item.name}}</div>
              <div class="pang-control">
                <van-stepper v-model="item.count" />
              </div>
            </div>
            <div class="pang-goods-price">
              <div>￥{{item.price | moneyFilter}}</div>
              <div>x{{item.count}}</div>
              <div class="allPrice">￥{{item.price*item.count | moneyFilter}}</div>
            </div>
          </div>
        </van-checkbox-group>
      </div>

      <!--显示总金额-->

      <!--div-- class="totalMoeny">商品总价:￥{{totalMoney | moneyFilter}}</!--div-->
      <van-submit-bar
        class="submit-bar"
        :price="totalMoney*100"
        button-text="提交订单"
        @submit="onSubmit"
        v-show="active"
      >
        <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
        <span slot="tip">
          你的收货地址不支持同城送,
          <span>修改地址</span>
        </span>
      </van-submit-bar>
      <van-submit-bar class="submit-bar" button-text="删除" @submit="deleteGoods" v-show="!active">
        <van-checkbox class="delete-all-box" v-model="checked" @click="selectAll">全选</van-checkbox>
      </van-submit-bar>
    </section>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      selected: [],
      cartInfo: [],
      isEmpty: false,
      checked: false,
      active: true,
      showGoods: true
    };
  },
  created() {
    this.getCartInfo();
  },
  updated() {},
  computed: {
    totalMoney() {
      let allMoney = 0;
      for (let goodsId of this.selected) {
        allMoney +=
          this.cartInfo.filter(item => item.goodsId == goodsId)[0].price *
          this.cartInfo.filter(item => item.goodsId == goodsId)[0].count;
      }
      return allMoney;
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    //得到购物车数据的方法
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    },
    onSubmit() {
      let selectedGoods = [];
      this.selected.forEach(id => {
        this.cartInfo.forEach(item => {
          if (id == item.goodsId) {
            selectedGoods.push(item);
          }
        });
      });
      localStorage.selectedGoods = JSON.stringify(selectedGoods)
      this.$router.push({ name: "CheckOut"});
    },
    deleteGoods() {
      for (let goodsId of this.selected) {
        this.cartInfo = this.cartInfo.filter(item => item.goodsId != goodsId);
      }
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      this.selected = [];
    },
    selectAll() {
      this.$refs.select.toggleAll(!this.checked);
    },
    edit() {
      this.active = !this.active;
    }
  },
  watch: {
    //监听selected变化，在单个商品点击事件函数中判断是无效的，因为函数执行过后才会被选中，selected才会变化
    selected: function() {
      if (this.cartInfo.length != 0) {
        this.checked =
          this.selected.length == this.cartInfo.length ? true : false;
      } else {
        this.checked = false;
      }
    },
    cartInfo: {
      handler() {
        localStorage.cartInfo = JSON.stringify(this.cartInfo);
        let count = 0;
        for (let item of this.cartInfo) {
          count += item.count;
        }
        //向父组件传递数量
        this.$emit("goods-count", count);
        //购物车是否还有商品
        if (!this.cartInfo.length) {
          this.showGoods = true;
        } else {
          this.showGoods = false;
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.navbar-div {
  height: 2.4rem;
  background: white;
  color: black;
  line-height: 2.4rem;
  border-bottom: 1px solid #eeeeee;
}
.navbar-div span {
  margin-left: 1rem;
}
.cart-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background-color: #fff;
}
section {
  height: calc(100vh - 7.5rem);
  overflow: scroll;
  background-color: #f0f0f0;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.pang-img {
  flex: 6;
}
.pang-text {
  flex: 14;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-goods-price {
  flex: 8;
  text-align: right;
}
.allPrice {
  color: red;
}
.totalMoeny {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
.submit-bar {
  margin-bottom: 2.5rem;
}
.delete-all-box {
  position: absolute;
  left: 16px;
}
</style>
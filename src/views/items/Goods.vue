<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" />
    </div>
    <van-divider />
    <div class="goods-price">￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    <div class="goods-name">
      <div class="name">{{goodsInfo.NAME}}</div>
      <div class="rate">
        <div style="float:left;border-right:1px solid grey;padding:0 .5rem;">
          <div class="one">1万+</div>
          <div class="two">累计销售</div>
        </div>
        <div style="float:right;padding-left:.5rem;">
          <div class="one">98.8%</div>
          <div class="two">好评率</div>
        </div>
      </div>
    </div>

    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评价">正在制作中</van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" :info="goodsCount" text="购物车" />
        <van-goods-action-button type="warning" text="加入购物车" @click="addGoodsToCart" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import goods from "@/json/goods.json";
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {} //商品详细数据
    };
  },
  created() {
    /*this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    this.goodsInfo = [...goods].find(val => val.ID == this.goodsId);*/
  },
  activated() {
    if (this.$route.params.goodsId) {
      this.goodsId = this.$route.params.goodsId;
      this.goodsInfo = [...goods].find(val => val.ID == this.goodsId);
    }
  },
  deactivated() {},
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  computed: {
    goodsCount() {
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      let count = 0;
      for (let item of cartInfo) {
        count += item.count;
      }
      return count;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    addGoodsToCart() {
      //取出购物车内的商品数据
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      //判断购物车内是否已经有这个商品
      //如果没有返回undeifnd，如果有返回第一个查找到的数据
      let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId);
      if (!isHaveGoods) {
        //没有商品直接添加到数组中
        //重新组成添加到购物车的信息
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        };
        cartInfo.push(newGoodsInfo); //添加到购物车
        localStorage.cartInfo = JSON.stringify(cartInfo); //操作本地数据
        this.$toast.success("添加成功");
      } else {
        this.$toast.success("已有此商品");
      }
      this.$router.push({ name: "Cart" }); //进行跳转
    }
  }
};
</script>

<style scoped>
.detail {
  font-size: 0px;
}

.goods-price {
  color: rgb(216, 53, 53);
  padding: 0 1rem;
  font-size: 1.3rem;
}
.goods-name {
  padding: 0.2rem 1rem;
  overflow: hidden;
}
.name {
  width: 11rem;
  display: inline-block;
  font-size: 0.9rem;
}
.rate {
  display: inline-block;
  overflow: hidden;
}
.rate > div {
  display: inline;
}
.rate .one {
  color: rgb(216, 53, 53);
  font-size: 0.8rem;
}
.rate .two {
  color: gray;
  font-size: 0.6rem;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
</style>
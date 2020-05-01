<template>
  <div>
    <div class="top">
      <img src="http://7xjyw1.com1.z0.glb.clouddn.com/touxiang001.jpg" class="top-img" />
    </div>
    <div class="login">
      <div>
        <van-button type="info" to="login">登录</van-button>
      </div>
      <div>
        <van-button type="primary" to="register">注册</van-button>
      </div>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="我的订单" isLink>
          <router-link to="/user/order/list/0" class="text-desc">全部订单</router-link>
        </van-cell>
      </van-cell-group>
      <van-row class="order_status">
        <van-col span="6">
          <div class="order_status_icon" @click="$router.push({path: '/user/order/list/1'})">
            <van-icon name="pending-payment" :info="order.unpaid > 0 ? order.unpaid : ''" />
          </div>
          <div>待付款</div>
        </van-col>
        <van-col span="6">
          <div class="order_status_icon" @click="$router.push({path: '/user/order/list/2'})">
            <van-icon name="send-gift-o" :info="order.unship > 0 ? order.unship : ''" />
          </div>
          <div>待发货</div>
        </van-col>
        <van-col span="6">
          <div class="order_status_icon" @click="$router.push({path: '/user/order/list/3'})">
            <van-icon name="logistics" :info="order.unrecv > 0 ? order.unrecv : ''" />
          </div>
          <div>待收货</div>
        </van-col>
        <van-col span="6">
          <div class="order_status_icon" @click="$router.push({path: '/user/order/list/4'})">
            <van-icon name="completed" :info="order.uncomment > 0 ? order.uncomment : ''" />
          </div>
          <div>已完成</div>
        </van-col>
      </van-row>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="会员卡" is-link />
        <van-cell title="地址管理" to="/addresslist" is-link />
        <van-cell title="会员权益" is-link />
        <van-cell title="联系我们" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { userIndex } from "@/api/api";

export default {
  name: "order-group",

  data() {
    return {
      order: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      userIndex().then(res => {
        this.order = res.data.data.order;
      });
    }
  }
};
</script>

<style scoped>
.navbar-div {
  height: 2.4rem;
  background: #4fc08d;
  color: white;
  line-height: 2.4rem;
}
.top-img {
  width: 70px;
  height: 70px;
  border-radius: 50px;
}
.top {
  height: 5rem;
  text-align: center;
  padding-top: 2rem;
  background-color: #4fc08d;
}
.login {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 10px;
}
.login div {
  flex: 1;
  text-align: center;
}
.text-desc{
    color: gray;
}
.order_status{
    font-size: .7rem;
    text-align: center;
    padding: 1rem 0;
}
.order_status > div{
    border-right: 1px solid rgb(223, 223, 223);
}
.order_status > div:last-child{
    border-right: none;
}
.order_status_icon{
    font-size: 1.5rem;
    
}
</style>